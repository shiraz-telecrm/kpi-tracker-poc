const { workspaceId, apiBase } = window.KPI_CONFIG;
document.getElementById("ws").textContent = workspaceId;
const $status = document.getElementById("status");
let token = sessionStorage.getItem("kpi_token") || "";

// Thin TeleCRM wrapper: all data lives in TeleCRM; the page only computes.
async function tele(path, body) {
  const r = await fetch(`${apiBase}/enterprise/${workspaceId}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body || {}),
  });
  if (!r.ok) throw new Error(`TeleCRM ${r.status}`);
  return r.json();
}

document.getElementById("connectBtn").onclick = async () => {
  token = document.getElementById("token").value.trim();
  try {
    await tele("/lead/search?limit=1", { fields: {} });
    sessionStorage.setItem("kpi_token", token);
    $status.textContent = "Connected.";
  } catch (e) { $status.textContent = "Connection failed: " + e.message; }
};
