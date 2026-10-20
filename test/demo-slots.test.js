import test from 'node:test';
import assert from 'node:assert/strict';
import { demoSlots } from '../src/lib/demo-slots.js';

const now = new Date('2030-01-10T13:10:00');

test('past dates return nothing', () => assert.deepEqual(demoSlots('2030-01-09', 2, now), []));
test('today hides times already passed', () => {
  const times = demoSlots('2030-01-10', 2, now).flatMap(s => s.slots.map(x => x.time));
  assert.ok(times.every(t => t > '13:10') && times.includes('18:00'));
});
test('deterministic', () => assert.deepEqual(demoSlots('2030-02-01', 4, now), demoSlots('2030-02-01', 4, now)));
test('bigger parties never gain availability', () => {
  const count = p => demoSlots('2030-02-01', p, now).flatMap(s => s.slots).filter(s => s.available).length;
  assert.ok(count(8) <= count(2));
});
