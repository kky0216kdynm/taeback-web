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

      const res = await api.verifyHead(inviteCode);

      if (!res?.success) {
        setError(res?.message || "로그인 실패");
        return;
      }

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

        {error && <div className="errorBanner">{error}</div>}

        <div className="row" style={{ gridTemplateColumns: "1fr" }}>
          <div className="label">본사 코드</div>
          <input
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="예: TBK_MAIN"
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
        </div>

        <div className="actions" style={{ justifyContent: "flex-end", marginTop: 10 }}>
          <button className="btn btnPrimary" onClick={submit} disabled={loading}>
            {loading ? "확인 중..." : "로그인"}
          </button>
        </div>

        <div className="small" style={{ marginTop: 10 }}>
          * 본사 코드는 대/소문자 구분 없이 입력 가능합니다.
        </div>
      </div>
    </div>
  );
}
