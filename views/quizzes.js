import { store } from "../store.js";

export default function Quizzes() {
  const el = document.createElement("section");
  el.className = "card";
  el.innerHTML = `
    <h1>Quick Quiz: HTML</h1>
    <form id="quiz"></form>
    <div id="out" class="small"></div>
    <button class="btn" id="submit" type="button">Submit</button>
  `;

  const qs = [
    { q: "Which element is the main landmark?", a: ["main", "section", "article", "div"], c: 0 },
    { q: "Where should site navigation go?", a: ["nav", "aside", "footer", "header"], c: 0 },
    { q: "Which attribute is for alternative text?", a: ["title", "alt", "aria-label", "desc"], c: 1 },
  ];

  const form = el.querySelector("#quiz");
  qs.forEach((it, i) => {
    const fs = document.createElement("fieldset");
    fs.innerHTML = `<legend>${i + 1}. ${it.q}</legend>`;
    it.a.forEach((opt, idx) => {
      const lbl = document.createElement("label");
      lbl.style.display = "block";
      lbl.innerHTML = `<input type="radio" name="q${i}" value="${idx}"> ${opt}`;
      fs.appendChild(lbl);
    });
    form.appendChild(fs);
  });

  el.querySelector("#submit").addEventListener("click", () => {
    const data = new FormData(form);
    let score = 0;
    qs.forEach((it, i) => {
      if (Number(data.get("q" + i)) === it.c) score++;
    });
    el.querySelector("#out").textContent = `Score: ${score}/${qs.length}`;
    const s = store.get();
    s.quizzes.html = { score, total: qs.length, last: Date.now() };
    store.set(s);
  });

  return el;
}
