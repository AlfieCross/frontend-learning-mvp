import { store } from "../store.js";
import { applyFontSize } from "../utils.js";

export default function Settings() {
  const s = store.get();
  const el = document.createElement("section");
  el.className = "card";
  el.innerHTML = `
    <h1>Settings</h1>
    <div style="display:flex; gap:.5rem; align-items:center; flex-wrap:wrap">
      <label>Font size
        <select id="fontSize">
          <option value="base">Base</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
        </select>
      </label>
      <button class="btn" id="reset" type="button">Reset Progress</button>
    </div>
  `;

  el.querySelector("#fontSize").value = s.fontSize;
  el.querySelector("#fontSize").addEventListener("change", (e) => {
    const st = store.get();
    st.fontSize = e.target.value;
    store.set(st);
    applyFontSize(e.target.value);
  });

  el.querySelector("#reset").addEventListener("click", () => {
    if (confirm("Reset all progress?")) {
      localStorage.removeItem("felearn.v1");
      location.reload();
    }
  });

  return el;
}
