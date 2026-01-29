import React from "react";

const items = [
  { key: "dashboard", label: "대시보드" },
  { key: "orders", label: "발주내역" },
  { key: "stats", label: "통계" },
];

export default function Sidebar({ route, onRoute }) {
  return (
    <div className="sidebar">
      <div className="brand">가맹점 관리</div>

      <div className="nav">
        {items.map((it) => (
          <a
            key={it.key}
            className={`navItem ${route === it.key ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onRoute(it.key);
            }}
          >
            <span style={{ width: 20, display: "inline-block" }}>•</span>
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}
