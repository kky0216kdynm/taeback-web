import React, { useState } from "react";
import { api } from "../api/client.js";

export default function Login({ onSuccess }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      const inviteCode = code.trim().toUpperCase();

      const res = await api.verifyHead(inviteCode); // ✅ 서버에 이미 있는 API

      if (!res?.success) {
        setError(res?.message || "로그인 실패");
        return;
      }

      // ✅ res.headOffice = { id, name }
      // 필요하면 branches도 같이 저장 가능
      onSuccess({ headOffice: res.headOffice });

    } catch (e) {
      setError(e.message || "서버 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginWrap">
      <div className="loginCard">
        <div className="loginTitle">본사 관리 시스템</div>
        <div className="loginSub">본사 코드를 입력해 접속하세요</div>

        <label className="label">본사 코드</label>
        <input
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="예: TBK_MAIN"
        />

        <button className="btnPrimary" onClick={submit} disabled={!code.trim() || loading}>
          {loading ? "확인 중..." : "입장"}
        </button>

        {error && <div className="errorText">{error}</div>}
      </div>
    </div>
  );
}
