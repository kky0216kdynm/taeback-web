import { toDate, ymd, ym } from "./date.js";

export function calcDashboard(orders) {
  const now = new Date();
  const todayKey = ymd(now);
  const monthKey = ym(now);

  let todayCount = 0, todayAmount = 0;
  let monthCount = 0, monthAmount = 0;
  let totalAmount = 0;

  for (const o of orders) {
    const dt = toDate(o.created_at);
    totalAmount += o.total_amount || 0;
    if (!dt) continue;

    if (ymd(dt) === todayKey) {
      todayCount += 1;
      todayAmount += o.total_amount || 0;
    }
    if (ym(dt) === monthKey) {
      monthCount += 1;
      monthAmount += o.total_amount || 0;
    }
  }

  return { todayCount, todayAmount, monthCount, monthAmount, totalAmount };
}

export function groupMonthly(orders, months = 12) {
  const now = new Date();
  const buckets = [];
  for (let i = months - 1; i >= 0; i--) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: ym(dt), label: `${dt.getMonth() + 1}월`, amount: 0, count: 0 });
  }
  const map = new Map(buckets.map(b => [b.key, b]));

  for (const o of orders) {
    const dt = toDate(o.created_at);
    if (!dt) continue;
    const key = ym(dt);
    const b = map.get(key);
    if (!b) continue;
    b.amount += o.total_amount || 0;
    b.count += 1;
  }
  return buckets;
}

export function topStores(orders, limit = 5) {
  const map = new Map();
  for (const o of orders) {
    const key = o.store_name || `STORE#${o.store_id}`;
    map.set(key, (map.get(key) || 0) + (o.total_amount || 0));
  }
  return [...map.entries()]
    .map(([name, amount]) => ({ name, amount }))
    .sort((a,b) => b.amount - a.amount)
    .slice(0, limit);
}
