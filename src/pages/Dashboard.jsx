import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";
import StatCard from "../components/StatCard.jsx";
import { calcDashboard } from "../utils/stats.js";

export default function Dashboard({ headOfficeId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);
      try {
        const o = await api.headOrders({ headOfficeId });
        setOrders(o.orders || []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [headOfficeId]);

  const dash = useMemo(() => calcDashboard(orders), [orders]);
  const activeStores = new Set(orders.map(o => o.store_id)).size;

  return (
    <div>
      {err && <div className="errorBanner">{err}</div>}

      <div className="grid4">
        <StatCard title="오늘 발주" big={`${dash.todayCount}건`} sub={`${dash.todayAmount.toLocaleString()}원`} />
        <StatCard title="이번 달 발주" big={`${dash.monthCount}건`} sub={`${dash.monthAmount.toLocaleString()}원`} />
        <StatCard title="활성 가맹점" big={`${activeStores}개`} sub="주문 발생 기준" />
        <StatCard title="총 발주 금액" big={`${dash.totalAmount.toLocaleString()}원`} sub="누적" />
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="sectionTitle">최근 발주 내역</div>
        {loading ? (
          <div className="muted" style={{ padding: 16 }}>불러오는 중...</div>
        ) : orders.length === 0 ? (
          <div className="muted" style={{ padding: 16 }}>발주 내역이 없습니다.</div>
        ) : (
          <div className="listStack">
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="orderRowPlain">
                <div>
                  <div className="orderStore">{o.store_name}</div>
                  <div className="orderMeta">{new Date(o.created_at).toLocaleString("ko-KR")}</div>
                </div>
                <div className="orderAmount">{(o.total_amount || 0).toLocaleString()}원</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
