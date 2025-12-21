import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";
import OrderListItem from "../components/OrderListItem.jsx";

export default function Orders({ headOfficeId }) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [detailMap, setDetailMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);
      try {
        const data = await api.headOrders({ headOfficeId, status: status || undefined });
        setOrders(data.orders || []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [headOfficeId, status]);

  const filtered = useMemo(() => {
    const kw = q.trim();
    if (!kw) return orders;
    return orders.filter(o =>
      (o.store_name || "").includes(kw) || String(o.store_id || "").includes(kw)
    );
  }, [orders, q]);

  const toggle = async (orderId) => {
    if (expandedId === orderId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(orderId);

    if (!detailMap[orderId]) {
      try {
        const d = await api.headOrderDetail(orderId);
        setDetailMap(prev => ({ ...prev, [orderId]: d }));
      } catch (e) {
        setErr(e.message);
      }
    }
  };

  return (
    <div>
      {err && <div className="errorBanner">{err}</div>}

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="filters">
          <input
            className="input"
            placeholder="가맹점명 또는 id 검색..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">전체 상태</option>
            <option value="pending">대기중</option>
            <option value="processing">처리중</option>
            <option value="done">완료</option>
          </select>
        </div>

        <div className="muted" style={{ padding: "0 14px 12px" }}>
          총 <b>{filtered.length}</b>건의 발주
        </div>
      </div>

      {loading ? (
        <div className="muted">불러오는 중...</div>
      ) : (
        <div className="listStack">
          {filtered.map((o) => (
            <OrderListItem
              key={o.id}
              order={o}
              expanded={expandedId === o.id}
              onToggle={() => toggle(o.id)}
            >
              <OrderDetail detail={detailMap[o.id]} />
            </OrderListItem>
          ))}
        </div>
      )}
    </div>
  );
}

function OrderDetail({ detail }) {
  const items = detail?.items || [];
  if (!detail) return <div className="muted">상세 불러오는 중...</div>;
  if (items.length === 0) return <div className="muted">품목이 없습니다.</div>;

  return (
    <div className="detailTable">
      <div className="detailHead">
        <div>상품</div><div>수량</div><div>단가</div><div>합계</div>
      </div>
      {items.map((it, idx) => (
        <div className="detailRow" key={idx}>
          <div>{it.name}</div>
          <div>{it.qty}</div>
          <div>{Number(it.unit_price || 0).toLocaleString()}원</div>
          <div>{Number(it.line_total || 0).toLocaleString()}원</div>
        </div>
      ))}
    </div>
  );
}
