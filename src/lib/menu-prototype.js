// Browser-only menu-manager prototype. NOT authentication, a CMS or a public publishing API.
// All data stays in this browser's localStorage. Never use for approved production menus.
export const MENU_TYPES = [
  { id: 'lunch', label: 'Lunch', channel: 'restaurant' },
  { id: 'evening', label: 'Evening', channel: 'restaurant' },
  { id: 'sunday', label: 'Sunday lunch', channel: 'restaurant' },
  { id: 'takeaway', label: 'Takeaway', channel: 'takeaway' },
];
const STORAGE_KEY = 'horse-menu-prototype-v1';
export const MAX_SECTIONS = 12;
export const MAX_ITEMS = 40;

export function uid() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID() : String(Date.now()) + '-' + String(Math.random()).slice(2);
}
export function clone(value) { return JSON.parse(JSON.stringify(value)); }
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[ch]);
}
export function money(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? '£' + n.toFixed(2) : '';
}
export function initialMenu(id) {
  const type = MENU_TYPES.find(t => t.id === id);
  if (!type) throw new Error('Unknown menu');
  const today = new Date();
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getDay() + 6) % 7));
  const weekOf = [monday.getFullYear(), String(monday.getMonth() + 1).padStart(2, '0'), String(monday.getDate()).padStart(2, '0')].join('-');
  return { id, title: type.label, weekOf, sections: [], updatedAt: null };
}
export function emptyStore() {
  return { version: 1, drafts: {}, published: {}, history: {} };
}
export function readStore() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (data?.version === 1 && data.drafts && data.published && data.history) return data;
  } catch { /* Corrupt or unavailable storage: display an empty prototype. */ }
  return emptyStore();
}
export function writeStore(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true; }
  catch { return false; }
}
export function validateMenu(menu) {
  const errors = [];
  if (!menu || !MENU_TYPES.some(t => t.id === menu.id)) return ['Unknown menu type.'];
  if (!String(menu.title || '').trim()) errors.push('Enter a menu title.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(menu.weekOf || '') || Number.isNaN(Date.parse(menu.weekOf))) errors.push('Choose a valid week commencing date.');
  if (!Array.isArray(menu.sections) || !menu.sections.length) errors.push('Add at least one section.');
  if (menu.sections?.length > MAX_SECTIONS) errors.push('Too many sections.');
  let itemCount = 0;
  for (const section of menu.sections || []) {
    if (!String(section.title || '').trim()) errors.push('Every section needs a name.');
    if (!Array.isArray(section.items)) { errors.push('Invalid section items.'); continue; }
    for (const item of section.items) {
      itemCount++;
      if (!String(item.name || '').trim()) errors.push('Every dish needs a name.');
      if (item.price === '' || item.price == null || !Number.isFinite(Number(item.price)) || Number(item.price) < 0)
        errors.push('Every dish needs a valid price (zero is allowed).');
      if (!item.allergensReviewed) errors.push('Confirm allergen information for each dish before publishing.');
    }
  }
  if (itemCount === 0) errors.push('Add at least one dish.');
  if (itemCount > MAX_ITEMS) errors.push('Too many dishes.');
  return [...new Set(errors)];
}
export function renderMenu(menu, { preview = false } = {}) {
  if (!menu || !Array.isArray(menu.sections)) return '';
  const sections = menu.sections.map(section => {
    const items = (section.items || []).filter(item => item.available !== false);
    if (!items.length) return '';
    return '<section class="published-menu__section"><h3>' + escapeHtml(section.title) + '</h3><ul class="published-menu__items">' +
      items.map(item => '<li class="published-menu__item"><div><strong>' + escapeHtml(item.name) +
        '</strong>' + (item.description ? '<p>' + escapeHtml(item.description) + '</p>' : '') +
        (item.allergens ? '<small>Allergens / dietary notes: ' + escapeHtml(item.allergens) + '</small>' : '') +
        '</div><span class="published-menu__price">' + money(item.price) + '</span></li>').join('') +
      '</ul></section>';
  }).join('');
  return '<article class="published-menu">' +
    '<header class="published-menu__head"><div><h2>' + escapeHtml(menu.title) + '</h2><p class="published-menu__dates">Week commencing ' + escapeHtml(menu.weekOf || 'not set') + '</p></div>' +
    (preview ? '<span class="published-menu__tag">Preview only</span>' : '') +
    '</header>' + sections + '</article>';
}
export function getPublished(channel, store = readStore()) {
  return MENU_TYPES.filter(t => t.channel === channel)
    .map(t => store.published[t.id]).filter(Boolean);
}
export function initPublicMenus() {
  const containers = document.querySelectorAll('[data-menu-public]');
  if (!containers.length) return;
  function refresh() {
    const store = readStore();
    containers.forEach(el => {
      const channel = el.getAttribute('data-menu-public');
      const menus = getPublished(channel, store);
      el.hidden = !menus.length;
      if (!menus.length) { el.innerHTML = ''; return; }
      el.innerHTML = '<div class="wrap"><div class="published-menu__notice"><strong>Local prototype preview</strong> — menus published in this browser only. Not verified by The Horse; do not rely on these for orders, prices or allergens.</div>' +
        '<div class="published-menu__grid">' + menus.map(m => renderMenu(m)).join('') + '</div></div>';
    });
  }
  refresh();
  window.addEventListener('storage', refresh);
  window.addEventListener('horse-menu-published', refresh);
}
