export function toDate(d) {
  if (!d) return null;

  // Date가 이미 들어오면 그대로
  if (d instanceof Date) return Number.isNaN(d.getTime()) ? null : d;

  // 숫자 timestamp면 그대로
  if (typeof d === "number") {
    const dt = new Date(d);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }

  let s = String(d).trim();

  // "YYYY-MM-DD HH:mm:ss(.ffffff)" -> ISO 비슷하게 변환
  // 1) 공백을 T로
  if (/^\d{4}-\d{2}-\d{2}\s/.test(s)) s = s.replace(" ", "T");

  // 2) 타임존이 없으면 +09:00 붙이기 (이 값은 KST라고 가정)
  const hasTZ = /([zZ]|[+\-]\d{2}:\d{2})$/.test(s);
  if (!hasTZ) s = `${s}+09:00`;

  const dt = new Date(s);
  return Number.isNaN(dt.getTime()) ? null : dt;
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
  