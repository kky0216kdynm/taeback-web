import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";
import { groupMonthly, topStores } from "../utils/stats.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";

export default function Stats({ headOfficeId }) {
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

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

  const monthly = useMemo(() => groupMonthly(orders, 12), [orders]);
  const top5 = useMemo(() => topStores(orders, 5), [orders]);

  return (
    <div>
      {err && <div className="errorBanner">{err}</div>}

      {loading ? (
        <div className="muted">불러오는 중...</div>
      ) : (
        <>
          <div className="card">
            <div className="sectionTitle">발주 금액 추이 (월별)</div>
            <div style={{ height: 260, padding: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip formatter={(v) => `${Number(v).toLocaleString()}원`} />
                  <Line type="monotone" dataKey="amount" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div className="sectionTitle">발주 건수 추이 (월별)</div>
            <div style={{ height: 220, padding: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <div className="sectionTitle">가맹점별 발주 Top 5</div>
            <div style={{ height: 260, padding: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top5} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(v) => Number(v).toLocaleString()} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip formatter={(v) => `${Number(v).toLocaleString()}원`} />
                  <Bar dataKey="amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
