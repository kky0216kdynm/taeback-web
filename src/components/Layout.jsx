import React from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function Layout({ headOfficeName, route, onRoute, onLogout, children }) {
  return (
    <div className="container">
      <Sidebar route={route} onRoute={onRoute} />
      <div className="main">
        <Topbar headOfficeName={headOfficeName} onLogout={onLogout} />
        {children}
      </div>
    </div>
  );
}
