import {
  MENU_TYPES, MAX_SECTIONS, MAX_ITEMS, uid, clone, escapeHtml, initialMenu,
  readStore, writeStore, validateMenu, renderMenu,
} from './menu-prototype.js';

// Interactive prototype only: no sign-in, backend, remote publication or customer data.
export function initMenuManager() {
  const root = document.querySelector('[data-menu-manager]');
  if (!root) return;
  const nav = root.querySelector('[data-mm-nav]');
  const workspace = root.querySelector('[data-mm-workspace]');
  const notice = root.querySelector('[data-mm-notice]');
  let store = readStore();
  let selected = 'lunch';
  let draft = clone(store.drafts[selected] || initialMenu(selected));
  let dirty = false;
  let preview = false;

  const typeName = id => MENU_TYPES.find(t => t.id === id)?.label || 'Menu';
  const allItems = () => draft.sections.reduce((n, s) => n + s.items.length, 0);
  const attr = value => escapeHtml(value ?? '');
  const dateText = value => value ? new Date(value).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  }) : 'Not yet';

  function message(text, error = false) {
    notice.textContent = text;
    notice.classList.toggle('mm-notice--error', error);
    notice.hidden = false;
  }
  function persist() {
    if (!writeStore(store)) {
      message('Browser storage is unavailable or full. Changes were not saved.', true);
      return false;
    }
    return true;
  }
  function markDirty() {
    dirty = true;
    const status = root.querySelector('[data-mm-dirty]');
    if (status) status.textContent = 'Unsaved changes';
  }
  function renderNav() {
    nav.innerHTML = MENU_TYPES.map(type => {
      const live = !!store.published[type.id];
      const saved = !!store.drafts[type.id];
      return '<button type="button" class="mm-menu-tab' + (type.id === selected ? ' is-active' : '') +
        '" data-action="select" data-menu-id="' + type.id + '" aria-pressed="' + (type.id === selected) + '">' +
        '<span>' + escapeHtml(type.label) + '</span><small>' + (live ? 'Published locally' : saved ? 'Draft saved' : 'Not started') +
        '</small></button>';
    }).join('');
  }
  function itemHtml(section, item, index) {
    const id = attr(item.id), sid = attr(section.id);
    return '<div class="mm-dish" data-dish="' + id + '">' +
      '<div class="mm-dish__top"><span class="mm-counter">Dish ' + (index + 1) + '</span>' +
      '<div class="mm-icon-actions">' +
      '<button type="button" data-action="move-item-up" data-section-id="' + sid + '" data-item-id="' + id + '" aria-label="Move dish up" title="Move up">↑</button>' +
      '<button type="button" data-action="move-item-down" data-section-id="' + sid + '" data-item-id="' + id + '" aria-label="Move dish down" title="Move down">↓</button>' +
      '<button type="button" class="mm-remove" data-action="remove-item" data-section-id="' + sid + '" data-item-id="' + id + '">Remove</button></div></div>' +
      '<div class="mm-fields mm-fields--two"><label>Dish name <input data-field="name" data-section-id="' + sid + '" data-item-id="' + id + '" value="' + attr(item.name) + '" maxlength="100" placeholder="e.g. a dish from the kitchen" /></label>' +
      '<label>Price (£) <input data-field="price" data-section-id="' + sid + '" data-item-id="' + id + '" type="number" min="0" max="1000" step="0.01" value="' + attr(item.price) + '" placeholder="0.00" /></label></div>' +
      '<label>Description <textarea data-field="description" data-section-id="' + sid + '" data-item-id="' + id + '" maxlength="300" rows="2" placeholder="Short description">' + escapeHtml(item.description) + '</textarea></label>' +
      '<label>Allergen / dietary information <input data-field="allergens" data-section-id="' + sid + '" data-item-id="' + id + '" maxlength="250" value="' + attr(item.allergens) + '" placeholder="Confirm with chef; do not infer" /></label>' +
      '<div class="mm-checks"><label><input type="checkbox" data-field="available" data-section-id="' + sid + '" data-item-id="' + id + '"' + (item.available !== false ? ' checked' : '') + ' /> Available on this menu</label>' +
      '<label><input type="checkbox" data-field="allergensReviewed" data-section-id="' + sid + '" data-item-id="' + id + '"' + (item.allergensReviewed ? ' checked' : '') + ' /> Allergen details reviewed by chef</label></div>' +
      '</div>';
  }
  function sectionHtml(section, index) {
    const id = attr(section.id);
    return '<div class="mm-section" data-section="' + id + '">' +
      '<div class="mm-section__top"><span class="mm-counter">Section ' + (index + 1) + '</span>' +
      '<div class="mm-icon-actions">' +
      '<button type="button" data-action="move-section-up" data-section-id="' + id + '" aria-label="Move section up" title="Move up">↑</button>' +
      '<button type="button" data-action="move-section-down" data-section-id="' + id + '" aria-label="Move section down" title="Move down">↓</button>' +
      '<button type="button" class="mm-remove" data-action="remove-section" data-section-id="' + id + '">Remove section</button></div></div>' +
      '<label>Section name <input data-field="section-title" data-section-id="' + id + '" maxlength="80" value="' + attr(section.title) + '" placeholder="Starters, mains, desserts..." /></label>' +
      '<div class="mm-dishes">' + section.items.map((item, i) => itemHtml(section, item, i)).join('') + '</div>' +
      '<button type="button" class="mm-add" data-action="add-item" data-section-id="' + id + '">+ Add dish</button></div>';
  }
  function render() {
    renderNav();
    const published = store.published[selected];
    const previous = (store.history[selected] || []).length;
    const type = MENU_TYPES.find(t => t.id === selected);
    workspace.innerHTML =
      '<div class="mm-workspace__heading"><div><p class="eyebrow">' + (type.channel === 'takeaway' ? 'Phone takeaway' : 'Restaurant menus') +
      '</p><h2>' + escapeHtml(type.label) + '</h2><p class="mm-muted">This browser only · No customer-facing publication</p></div>' +
      '<div class="mm-status"><span data-mm-dirty>' + (dirty ? 'Unsaved changes' : 'Draft ready') + '</span><small>' +
      (published ? 'Published locally ' + dateText(published.publishedAt) : 'Not published') + '</small></div></div>' +
      '<div class="mm-toolbar">' +
      '<button type="button" class="mm-btn mm-btn--primary" data-action="save">Save draft</button>' +
      '<button type="button" class="mm-btn mm-btn--accent" data-action="publish">Publish demo</button>' +
      '<button type="button" class="mm-btn" data-action="preview">' + (preview ? 'Edit menu' : 'Preview menu') + '</button>' +
      '<button type="button" class="mm-btn" data-action="restore" ' + (!published ? 'disabled' : '') + '>Copy published to draft</button>' +
      '<button type="button" class="mm-btn" data-action="undo" ' + (!store.drafts[selected] ? 'disabled' : '') + '>Discard edits</button>' +
      (published ? '<button type="button" class="mm-btn mm-btn--danger" data-action="unpublish">Unpublish demo</button>' : '') +
      '</div>' +
      (preview ?
        '<div class="mm-preview"><div class="mm-preview__top"><strong>Customer view · preview</strong><span>Not live on the real website</span></div>' +
        (draft.sections.length ? renderMenu(draft, { preview: true }) : '<p>Add dishes to preview the menu.</p>') +
        '</div>' :
        '<div class="mm-editor">' +
        '<div class="mm-editor__meta"><label>Menu title <input data-field="title" maxlength="100" value="' + attr(draft.title) + '" /></label>' +
        '<p class="mm-muted">Changes are saved to this browser only. The restaurant website and its visitors are unaffected.</p></div>' +
        '<div class="mm-section-list">' + draft.sections.map(sectionHtml).join('') + '</div>' +
        '<button type="button" class="mm-add mm-add--section" data-action="add-section">+ Add section</button>' +
        '</div>') +
      '<div class="mm-bottom"><div><strong>Prototype controls</strong><p>Published demo menus can be viewed on the public-style menu pages in this same browser.</p></div>' +
      '<div class="mm-bottom__actions"><a href="' + attr(root.dataset.menusUrl) + '" target="_blank" rel="noopener">View menus ↗</a>' +
      '<a href="' + attr(root.dataset.takeawayUrl) + '" target="_blank" rel="noopener">View takeaway ↗</a></div></div>' +
      '<div class="mm-history"><strong>Previous local versions: ' + previous + '</strong> · ' +
      '<button type="button" data-action="rollback" ' + (!previous ? 'disabled' : '') + '>Restore previous published version</button></div>';
  }
  function fieldChanged(target) {
    const field = target.dataset.field;
    if (!field) return;
    const sid = target.dataset.sectionId, iid = target.dataset.itemId;
    const section = sid ? draft.sections.find(s => s.id === sid) : null;
    const item = section && iid ? section.items.find(i => i.id === iid) : null;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (field === 'title') draft.title = value;
    else if (field === 'section-title' && section) section.title = value;
    else if (item && ['name', 'description', 'price', 'allergens', 'available', 'allergensReviewed'].includes(field))
      item[field] = value;
    else return;
    markDirty();
  }
  root.addEventListener('input', event => fieldChanged(event.target));
  root.addEventListener('change', event => fieldChanged(event.target));
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button || !root.contains(button)) return;
    const action = button.dataset.action, sid = button.dataset.sectionId, iid = button.dataset.itemId;
    const section = draft.sections.find(s => s.id === sid);
    const index = section ? draft.sections.indexOf(section) : -1;
    const itemIndex = section && iid ? section.items.findIndex(i => i.id === iid) : -1;

    if (action === 'select') {
      const id = button.dataset.menuId;
      if (id === selected) return;
      if (dirty && !window.confirm('Discard unsaved edits and switch menus?')) return;
      selected = id;
      draft = clone(store.drafts[id] || initialMenu(id));
      dirty = false; preview = false; notice.hidden = true; render(); return;
    }
    if (action === 'save' || action === 'publish') {
      if (action === 'publish') {
        const errors = validateMenu(draft);
        if (errors.length) { message('Cannot publish: ' + errors.join(' '), true); return; }
        if (!window.confirm('Publish this menu to your browser-only demo? This does NOT update the real website for other visitors.')) return;
      }
      const stamp = new Date().toISOString();
      draft.updatedAt = stamp;
      store.drafts[selected] = clone(draft);
      if (action === 'publish') {
        const old = store.published[selected];
        if (old) {
          store.history[selected] ||= [];
          store.history[selected].unshift(clone(old));
          store.history[selected] = store.history[selected].slice(0, 10);
        }
        store.published[selected] = { ...clone(draft), publishedAt: stamp };
      }
      if (!persist()) return;
      dirty = false;
      render();
      message(action === 'publish' ? 'Published to this browser only. Open the public-style menu page to see it.' : 'Draft saved in this browser.');
      if (action === 'publish') window.dispatchEvent(new Event('horse-menu-published'));
      return;
    }
    if (action === 'preview') { preview = !preview; render(); return; }
    if (action === 'undo') {
      if (dirty && !window.confirm('Discard your unsaved edits?')) return;
      draft = clone(store.drafts[selected] || initialMenu(selected));
      dirty = false; preview = false; render(); message('Unsaved edits discarded.'); return;
    }
    if (action === 'restore') {
      const published = store.published[selected];
      if (!published || !window.confirm('Replace your current draft with the locally published version?')) return;
      draft = clone(published); delete draft.publishedAt; dirty = true; preview = false; render();
      message('Published version copied into your draft. Save or publish to keep it.'); return;
    }
    if (action === 'unpublish') {
      if (!store.published[selected] || !window.confirm('Remove this menu from the browser-only public preview?')) return;
      store.history[selected] ||= [];
      store.history[selected].unshift(clone(store.published[selected]));
      store.history[selected] = store.history[selected].slice(0, 10);
      delete store.published[selected];
      if (!persist()) return;
      render(); message('Unpublished in this browser.'); return;
    }
    if (action === 'rollback') {
      const previous = store.history[selected]?.[0];
      if (!previous || !window.confirm('Restore the previous published version in this browser?')) return;
      const old = store.published[selected];
      store.history[selected].shift();
      if (old) store.history[selected].unshift(clone(old));
      store.published[selected] = { ...clone(previous), publishedAt: new Date().toISOString() };
      if (!persist()) return;
      render(); message('Previous version restored to the browser-only preview.'); return;
    }
    if (action === 'add-section') {
      if (draft.sections.length >= MAX_SECTIONS) { message('Maximum of 12 sections in the prototype.', true); return; }
      draft.sections.push({ id: uid(), title: '', items: [] });
    } else if (action === 'remove-section' && section) {
      if (!window.confirm('Remove this section and all its dishes from the draft?')) return;
      draft.sections.splice(index, 1);
    } else if (action === 'move-section-up' && index > 0) {
      [draft.sections[index - 1], draft.sections[index]] = [draft.sections[index], draft.sections[index - 1]];
    } else if (action === 'move-section-down' && index >= 0 && index < draft.sections.length - 1) {
      [draft.sections[index + 1], draft.sections[index]] = [draft.sections[index], draft.sections[index + 1]];
    } else if (action === 'add-item' && section) {
      if (allItems() >= MAX_ITEMS) { message('Maximum of 40 dishes in the prototype.', true); return; }
      section.items.push({ id: uid(), name: '', description: '', price: '', allergens: '', available: true, allergensReviewed: false });
    } else if (action === 'remove-item' && section && itemIndex >= 0) {
      if (!window.confirm('Remove this dish from the draft?')) return;
      section.items.splice(itemIndex, 1);
    } else if (action === 'move-item-up' && section && itemIndex > 0) {
      [section.items[itemIndex - 1], section.items[itemIndex]] = [section.items[itemIndex], section.items[itemIndex - 1]];
    } else if (action === 'move-item-down' && section && itemIndex >= 0 && itemIndex < section.items.length - 1) {
      [section.items[itemIndex + 1], section.items[itemIndex]] = [section.items[itemIndex], section.items[itemIndex + 1]];
    } else return;
    markDirty(); render();
  });
  render();
}
