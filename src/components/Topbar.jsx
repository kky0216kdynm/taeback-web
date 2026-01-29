import React from "react";

export default function Topbar() {
  return (
    <div className="topbar">
      <div />
      <div className="small">MASTER</div>
    </div>
  );
}
import React from "react";

export default function Topbar({ headOfficeName, onLogout }) {
  return (
    <div className="topbar">
      <div>
        <div className="h1" style={{ fontSize: 18, margin: 0 }}>
          {headOfficeName ?? "본사"}
        </div>
        <div className="small">HEAD OFFICE</div>
      </div>

      <div className="rightActions">
        <div className="small">ADMIN</div>
        {onLogout && (
          <button className="btn btnDanger" onClick={onLogout}>
            로그아웃
          </button>
        )}
      </div>
    </div>
  );
}
