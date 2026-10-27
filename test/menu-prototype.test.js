import test from 'node:test';
import assert from 'node:assert/strict';
import { initialMenu, validateMenu, renderMenu, escapeHtml, getPublished, emptyStore, MENU_TYPES } from '../src/lib/menu-prototype.js';

const complete = () => ({
  ...initialMenu('lunch'),
  sections: [{ id: 's1', title: 'Mains', items: [
    { id: 'i1', name: 'Test dish', description: 'Description', price: '12.50', allergens: 'Ask staff', available: true, allergensReviewed: true },
  ] }],
});
test('four separate restaurant/takeaway menus', () => {
  assert.deepEqual(MENU_TYPES.map(x => x.id), ['lunch', 'evening', 'sunday', 'takeaway']);
  const store = emptyStore();
  store.published.lunch = complete();
  store.published.takeaway = { ...complete(), id: 'takeaway' };
  assert.equal(getPublished('restaurant', store).length, 1);
  assert.equal(getPublished('takeaway', store).length, 1);
});
test('empty and unreviewed menus cannot publish', () => {
  assert.ok(validateMenu(initialMenu('lunch')).length);
  const m = complete();
  m.sections[0].items[0].allergensReviewed = false;
  assert.ok(validateMenu(m).some(x => x.includes('allergen')));
  m.sections[0].items[0].allergensReviewed = true;
  assert.deepEqual(validateMenu(m), []);
});
test('price validation rejects missing and negative values', () => {
  const m = complete();
  m.sections[0].items[0].price = '';
  assert.ok(validateMenu(m).some(x => x.includes('price')));
  m.sections[0].items[0].price = '-1';
  assert.ok(validateMenu(m).some(x => x.includes('price')));
});
test('user content is HTML escaped in preview and public listings', () => {
  const m = complete();
  m.title = '<img src=x onerror=alert(1)>';
  m.sections[0].items[0].name = '<script>alert(1)</script>';
  const html = renderMenu(m);
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<img'));
  assert.equal(escapeHtml('a&b'), 'a&amp;b');
});
test('unavailable dishes are excluded from listings', () => {
  const m = complete();
  m.sections[0].items[0].available = false;
  assert.ok(!renderMenu(m).includes('Test dish'));
});
