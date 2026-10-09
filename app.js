const { workspaceId, apiBase, syncToken } = window.KPI_CONFIG;

// Thin TeleCRM wrapper: all data lives in TeleCRM; the page only computes.
async function tele(path, body) {
  const r = await fetch(`${apiBase}/enterprise/${workspaceId}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${syncToken}` },
    body: JSON.stringify(body || {}),
  });
  if (!r.ok) throw new Error(`TeleCRM ${r.status}`);
  return r.json();
}

(async () => {
  const el = document.getElementById("status");
  try {
    const res = await tele("/lead/search?limit=1", { fields: {} });
    el.textContent = `Connected to TeleCRM (${(res.data || []).length >= 0 ? "ok" : ""}).`;
  } catch (e) { el.textContent = "TeleCRM connection failed: " + e.message; }
})();
