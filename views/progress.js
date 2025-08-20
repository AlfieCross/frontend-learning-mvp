import { store } from "../store.js";
import { overallProgress } from "../helpers/progress.js";

export default function Progress() {
  const s = store.get();
  const pct = overallProgress(s);

  const el = document.createElement("section");
  el.className = "card";
  el.innerHTML = `
    <h1>Your Progress</h1>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <p class="small">${pct}% complete</p>
    <div style="display:flex; gap:.5rem; flex-wrap:wrap">
      <button class="btn" id="export" type="button">Export JSON</button>
      <label class="btn" for="importFile" style="display:inline-block">
        Import JSON
        <input id="importFile" type="file" accept="application/json" style="display:none">
      </label>
    </div>
    <pre id="dump" class="small" style="white-space:pre-wrap"></pre>
  `;

  el.querySelector("#export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(store.get(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "felearn-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  el.querySelector("#importFile").addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    f.text().then((txt) => {
      try {
        store.set(JSON.parse(txt));
        alert("Imported!");
        location.reload();
      } catch {
        alert("Invalid file.");
      }
    });
  });

  el.querySelector("#dump").textContent = JSON.stringify(store.get(), null, 2);
  return el;
}
