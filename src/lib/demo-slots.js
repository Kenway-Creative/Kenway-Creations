// DEMONSTRATION ONLY. Fictional, deterministic availability so the booking UX can be shown.
// Not the restaurant's real service times, capacity or rules (all owner-dependent, see docs/content-register.md).
const SESSIONS = [
  { id: 'lunch', label: 'Lunch', times: ['12:00', '12:30', '13:00', '13:30', '14:00'] },
  { id: 'evening', label: 'Evening', times: ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'] },
];

function hash(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967296;
}

/**
 * @param {string} date  YYYY-MM-DD
 * @param {number} party guests
 * @param {Date} [now]   injectable for tests
 * @returns {{id:string,label:string,slots:{time:string,available:boolean}[]}[]}
 */
export function demoSlots(date, party, now = new Date()) {
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  if (date < today) return [];
  return SESSIONS.map(({ id, label, times }) => ({
    id, label,
    slots: times
      .filter(t => date > today || t > now.toTimeString().slice(0, 5))
      // Larger parties are "harder to seat"; purely illustrative.
      .map(time => ({ time, available: hash(`${date}|${time}`) > 0.25 + party * 0.04 })),
  }));
}
