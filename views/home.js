import { overallProgress } from "../helpers/progress.js";
import { store } from "../store.js";

export default function Home() {
    const s = store.get();
    const pct = overallProgress(s);

    const el = document.createElement("section");
    el.className = "grid cols-2";
    el.innerHTML = `
    <div class="card">
      <h1>Welcome 👋</h1>
      <p class="small">Tiny steps, big progress.</p>
      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
        <span style="width:${pct}%"></span>
      </div>
      <p class="small">Overall: ${pct}%</p>
      <a class="btn" href="#/learn">Start a lesson</a>
    </div>
    <div class="card">
      <h2>Today’s Tip</h2>
      <p>Use semantic HTML first; classes and frameworks come later.</p>
    </div>
  `;
    return el;
}
