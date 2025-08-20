import { esc } from "../utils.js";
import { store } from "../store.js";

export default function Learn() {
  const s = store.get();
  const lessons = {
    html: [
      { id: "h1", title: "Semantic landmarks", note: "header/nav/main/footer/aside/article/section", code: "<main>...</main>" },
      { id: "h2", title: "Forms: label & inputs", note: "Always connect <label for> to inputs", code: '<label for="e">Email</label> <input id="e" type="email" required>' },
      { id: "h3", title: "Images & alt text", note: "Meaningful alt or empty for decorative", code: '<img src="team.jpg" alt="Team behind counter">' },
    ],
    css: [
      { id: "c1", title: "Box model", note: "content, padding, border, margin", code: ".card{padding:1rem;border:1px solid #0003;margin:1rem 0}" },
      { id: "c2", title: "Flexbox basics", note: "axis, justify, align, gap", code: ".row{display:flex;gap:1rem;align-items:center}" },
      { id: "c3", title: "Responsive type", note: "Use clamp() for scalable text", code: "h1{font-size:clamp(1.5rem,2.5vw,2.25rem)}" },
    ],
    js: [
      { id: "j1", title: "DOM select + click", note: "querySelector + addEventListener", code: "const b=document.querySelector('#go'); b.addEventListener('click',()=>alert('Hi'));"},
      { id: "j2", title: "localStorage 101", note: "Get/set JSON state", code: "const key='demo'; const s=JSON.parse(localStorage.getItem(key)||'{}'); s.hits=(s.hits||0)+1; localStorage.setItem(key, JSON.stringify(s));"},
      { id: "j3", title: "Array methods", note: "map/filter/reduce patterns", code: "const sum=[1,2,3].reduce((a,b)=>a+b,0)"},
    ],
  };

  const el = document.createElement("section");
  el.className = "grid cols-3";
  el.append(
    moduleCard("HTML", lessons.html, s),
    moduleCard("CSS", lessons.css, s),
    moduleCard("JS", lessons.js, s),
  );
  return el;
}

function moduleCard(label, items, state) {
  const key = label.toLowerCase();
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>${label}</h2>`;

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";

  items.forEach((it) => {
    const li = document.createElement("li");
    const checked = !!state.lessons[key][it.id];
    li.innerHTML = `
      <label>
        <input type="checkbox" ${checked ? "checked" : ""}> ${it.title}
      </label>
      <p class="small">${esc(it.note)}</p>
      <pre><code>${esc(it.code)}</code></pre>
    `;
    li.querySelector("input").addEventListener("change", (e) => {
      const s = store.get();
      s.lessons[key][it.id] = e.target.checked;
      store.set(s);
    });
    ul.appendChild(li);
  });

  card.appendChild(ul);
  return card;
}
