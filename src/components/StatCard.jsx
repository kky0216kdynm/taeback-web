import React from "react";

export default function StatCard({ title, big, sub }) {
  return (
    <div className="card">
      <div className="cardTitle">{title}</div>
      <div className="cardValue">{big}</div>
      <div className="cardSmall">{sub}</div>
    </div>
  );
}
