export function toDate(d) {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? null : dt;
  }
  
  export function formatKoreanDateTime(d) {
    const dt = toDate(d);
    if (!dt) return "-";
    return dt.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  }
  
  
  export function ymd(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  
  export function ym(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }
  