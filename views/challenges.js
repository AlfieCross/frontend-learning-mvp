export default function Challenges() {
    const el = document.createElement("section");
    el.className = "card";
    el.innerHTML = `
      <h1>Mini Challenge: Build a Card</h1>
      <p class="small">Write HTML/CSS that renders a simple profile card.</p>
      <textarea id="code" rows="10" style="width:100%">${sample()}</textarea>
      <div style="display:flex;gap:.5rem;margin-top:.5rem">
        <button class="btn" id="run">Run ▶</button>
        <button class="btn" id="reset">Reset</button>
      </div>
      <iframe id="runner" title="Output" style="width:100%;height:280px;background:white;border-radius:.6rem;margin-top:.6rem"></iframe>
    `;

    // bind after inserted
    setTimeout(() => {
        el.querySelector("#runner").srcdoc = sample();
        el.querySelector("#run").addEventListener("click", () => {
            el.querySelector("#runner").srcdoc = el.querySelector("#code").value;
        });
        el.querySelector("#reset").addEventListener("click", () => {
            el.querySelector("#code").value = sample();
            el.querySelector("#runner").srcdoc = sample();
        });
    });

    return el;
}

function sample() {
    return `<!doctype html>
  <html>
  <head><meta charset="utf-8"><style>
    body{font-family:system-ui;padding:1rem;background:#f6f8fc}
    .card{max-width:360px;margin:auto;background:#fff;border-radius:12px;padding:1rem;box-shadow:0 8px 24px #0001}
    .row{display:flex;gap:1rem;align-items:center}
    img{width:72px;height:72px;border-radius:50%;object-fit:cover}
    .small{color:#6b7280}
  </style></head>
  <body>
    <article class="card">
      <div class="row">
        <img src="https://picsum.photos/120" alt="Random person">
        <div>
          <h2>Alfie</h2>
          <p class="small">Frontend learner</p>
        </div>
      </div>
    </article>
  </body>
  </html>`;
}
