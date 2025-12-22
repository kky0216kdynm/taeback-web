import React from "react";
import { formatKoreanDateTime } from "../utils/date.js";

function statusLabel(s) {
  if (s === "pending") return { text: "대기중", cls: "pill pending" };
  if (s === "processing") return { text: "처리중", cls: "pill processing" };
  if (s === "done") return { text: "완료", cls: "pill done" };
  return { text: s, cls: "pill" };
}

export default function OrderListItem({ order, onToggle, expanded, children }) {
  const st = statusLabel(order.status);

  return (
    <div className="card orderCard">
      <div className="orderRow" onClick={onToggle}>
        <div className="orderLeft">
          <div className="orderStore">{order.store_name}</div>
          <div className="orderMeta">{o.created_at}</div>
        </div>

        <div className="orderRight">
          <div className={st.cls}>{st.text}</div>
          <div className="orderAmount">{(order.total_amount || 0).toLocaleString()}원</div>
        </div>
      </div>

      {expanded && <div className="orderDetail">{children}</div>}
    </div>
  );
}
