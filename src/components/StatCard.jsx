import React from "react";

export default function StatCard({ title, big, sub }) {
  return (
    <div className="card statCard">
      <div className="statTitle">{title}</div>
      <div className="statBig">{big}</div>
      <div className="statSub">{sub}</div>
    </div>
  );
}
