const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function analyzeDeal(payload: any) {
  const url = (API_BASE || "") + "/api/analyzeDeal";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${text}`);
  }
  return res.json();
}
