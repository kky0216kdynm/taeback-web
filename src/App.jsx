import React, { useState } from "react";
import Login from "./pages/Login.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/Orders.jsx";
import Stats from "./pages/Stats.jsx";

function getSavedHead() {
  try {
    const raw = localStorage.getItem("head_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [session, setSession] = useState(getSavedHead()); // { headOffice: {id,name} }
  const [route, setRoute] = useState("dashboard");

  const onLogout = () => {
    localStorage.removeItem("head_session");
    setSession(null);
    setRoute("dashboard");
  };

  const headOfficeId = session?.headOffice?.id;

  if (!session) return <Login onSuccess={setSession} />;

  return (
    <Layout
      headOfficeName={session.headOffice?.name ?? "본사"}
      route={route}
      onRouteChange={setRoute}
      onLogout={onLogout}
    >
      {route === "dashboard" && <Dashboard headOfficeId={headOfficeId} />}
      {route === "orders" && <Orders headOfficeId={headOfficeId} />}
      {route === "stats" && <Stats headOfficeId={headOfficeId} />}
    </Layout>
  );
}
