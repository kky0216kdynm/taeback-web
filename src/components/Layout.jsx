import React from "react";

export default function Layout({ headOfficeName, route, onRouteChange, onLogout, children }) {
  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <div className="brandTitle">본사 관리 시스템</div>
          <div className="brandSub">{headOfficeName} · 발주 관리 및 통계</div>
        </div>
        <button className="btnGhost" onClick={onLogout}>나가기</button>
      </div>

      <div className="tabsRow">
        <button className={route==="dashboard" ? "tab tabActive" : "tab"} onClick={() => onRouteChange("dashboard")}>
          대시보드
        </button>
        <button className={route==="orders" ? "tab tabActive" : "tab"} onClick={() => onRouteChange("orders")}>
          발주 내역
        </button>
        <button className={route==="stats" ? "tab tabActive" : "tab"} onClick={() => onRouteChange("stats")}>
          통계
        </button>
      </div>

      <div className="page">{children}</div>
    </div>
  );
}
