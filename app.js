/* =======================================================
   Frontend Learning — MVP App
   - Hash routing
   - Theme + font size settings (localStorage)
   - Learn page with checkable micro-lessons
   - Challenges page with simple HTML/CSS/JS runner
   - Quiz engine (one sample quiz)
   - Progress summary

   Tips:
   - Keep functions small and pure where possible.
   - Store gets/sets are centralized for safety.
   - Avoid framework lock-in; this is framework-free.
   ======================================================= */

const STORAGE_KEY = 'felearn.progress';
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

const store = {
  get() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState(); }
    catch { return defaultState(); }
  },
  set(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
};

function defaultState() {
  return {
    lessons: { html: {}, css: {}, js: {} },
    quizzes: { html: {}, css: {}, js: {} },
    challenges: {},
    badges: [],
    streak: { count: 0, last: new Date().toISOString().slice(0, 10) },
    theme: 'dark',
    fontSize: 'base'
  };
}

// ----------------------- Router -----------------------
const routes = {
  '/': Home,
  '/learn': Learn,
  '/challenges': Challenges,
  '/quizzes': Quizzes,
  '/projects': Projects,
  '/glossary': Glossary,
  '/progress': Progress,
  '/settings': Settings
};

function render() {
  const path = location.hash.slice(1) || '/';
  const view = routes[path] || NotFound;
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view());
  app.focus();
  highlightNav(path);
}

function highlightNav(path) {
  $$('.sidebar nav a').forEach(a => {
    if (a.getAttribute('href') === `#${path}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  // theme init
  const state = store.get();
  if (state.theme === 'light') document.documentElement.classList.add('light');
  $('#themeToggle').addEventListener('click', () => {
    const s = store.get();
    const isLight = document.documentElement.classList.toggle('light');
    s.theme = isLight ? 'light' : 'dark';
    store.set(s);
    $('#themeToggle').setAttribute('aria-pressed', String(isLight));
  });

  // apply saved font size immediately
  applyFontSize(state.fontSize);

  render();
});

// ----------------------- Views -----------------------
function Home() {
  const state = store.get();
  const el = document.createElement('section');
  el.className = 'grid cols-2';
  el.innerHTML = `
    <div class="card">
      <h1>Welcome back 👋</h1>
      <p class="small">Build momentum with a tiny win today.</p>
      <div class="progress" aria-label="Overall progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${overallProgress(state)}">
        <span style="width:${overallProgress(state)}%"></span>
      </div>
      <p class="small">Overall: ${overallProgress(state)}%</p>
      <a class="btn" href="#/learn">Start a lesson</a>
    </div>
    <div class="card">
      <h2>Today’s Tip</h2>
      <p>Use semantic elements (<code>header</code>, <code>main</code>, <code>nav</code>, <code>footer</code>) to improve a11y and SEO.</p>
      <span class="badge">Semantics FTW</span>
    </div>
  `;
  return el;
}

function Learn() {
  const s = store.get();
  const lessons = {
    html: [
      { id: 'html-1', title: 'Semantic tags', text: 'Use <main>, <section>, <article>, <aside> appropriately.' },
      { id: 'html-2', title: 'Forms basics', text: 'Labels, inputs, required, aria-describedby.' },
      { id: 'html-3', title: 'Images & alt', text: 'Meaningful alt text and decorative images.' }
    ],
    css: [
      { id: 'css-1', title: 'Box model', text: 'content, padding, border, margin.' },
      { id: 'css-2', title: 'Flexbox intro', text: 'axis, justify, align, gap.' },
      { id: 'css-3', title: 'Responsive units', text: '%, vw, clamp(), container queries (later).' }
    ],
    js: [
      { id: 'js-1', title: 'DOM selects', text: 'querySelector, event listeners.' },
      { id: 'js-2', title: 'State & storage', text: 'localStorage patterns.' },
      { id: 'js-3', title: 'Async basics', text: 'Promise, async/await (later).' }
    ]
  };

  const el = document.createElement('section');
  el.className = 'grid cols-3';
  el.append(
    moduleCard('HTML', lessons.html, s),
    moduleCard('CSS', lessons.css, s),
    moduleCard('JavaScript', lessons.js, s)
  );
  return el;
}

function moduleCard(label, items, s) {
  const key = label.toLowerCase();
  const wrap = document.createElement('div');
  wrap.className = 'card';
  wrap.innerHTML = `<h2>${label}</h2>`;
  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.padding = 0;

  items.forEach(item => {
    const li = document.createElement('li');
    const id = item.id;
    const checked = Boolean(s.lessons[key][id]);
    li.innerHTML = `
      <label>
        <input type="checkbox" ${checked ? 'checked' : ''} aria-label="Mark ${item.title} as complete"> ${item.title}
      </label>
      <p class="small">${item.text}</p>
    `;
    $('input', li).addEventListener('change', (e) => {
      const state = store.get();
      state.lessons[key][id] = e.target.checked;
      store.set(state);
      // badge example
      maybeBadge(state);
    });
    ul.appendChild(li);
  });
  wrap.appendChild(ul);
  return wrap;
}

function maybeBadge(state) {
  const total = Object
    .values(state.lessons)
    .flatMap(x => Object.values(x))
    .filter(Boolean).length;
  if (total >= 3 && !state.badges.includes('First Steps')) {
    state.badges.push('First Steps');
    store.set(state);
    alert('🏅 New badge unlocked: First Steps');
  }
}

function Challenges() {
  const el = document.createElement('section');
  el.className = 'card';
  el.innerHTML = `
    <h1>Challenges</h1>
    <p class="small">Write HTML/CSS/JS and run it below.</p>
    <textarea id="code" rows="10" style="width:100%">
<!doctype html>
<html><head><meta charset="utf-8"><style>body{font-family:system-ui;padding:1rem}</style></head><body>
<h1>Hello, world!</h1>
<script>console.log('It works!')<\/script>
</body></html></textarea>
    <div style="display:flex; gap:.5rem; margin-top:.5rem">
      <button class="btn" id="run">Run ▶</button>
      <button class="btn" id="reset">Reset</button>
    </div>
    <iframe id="runner" title="Code output" style="width:100%; height:280px; background:white; border-radius:.6rem; margin-top:.6rem"></iframe>
  `;
  // Bind after insertion
  setTimeout(() => {
    $('#run', el).addEventListener('click', () => runCode(el));
    $('#reset', el).addEventListener('click', () => $('#code', el).value = defaultSnippet());
    $('#runner', el).srcdoc = defaultSnippet();
  });
  return el;
}

function defaultSnippet() {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"><style>body{font-family:system-ui;padding:1rem}</style></head>
<body>
  <h1>Hello, world!</h1>
  <p>Edit the textarea and press Run.</p>
  <script>console.log('It works!')<\/script>
</body>
</html>`;
}

function runCode(scope) {
  const code = $('#code', scope).value;
  $('#runner', scope).srcdoc = code;
}

function Quizzes() {
  const state = store.get();
  const el = document.createElement('section');
  el.className = 'card';
  el.innerHTML = `
    <h1>Quick Quiz: HTML Basics</h1>
    <form id="quiz"></form>
    <div id="result" class="small"></div>
    <button class="btn" id="submit">Submit</button>
  `;

  const questions = [
    { q: 'Which element represents the main content?', a: ['main', 'section', 'article', 'div'], c: 0, e: '<main> is for the document’s primary content.' },
    { q: 'Which attribute provides alternative text for images?', a: ['title', 'alt', 'aria-label', 'desc'], c: 1, e: 'Use meaningful alt text; leave empty for decorative images.' },
    { q: 'Which element is a landmark for navigation?', a: ['nav', 'aside', 'footer', 'header'], c: 0, e: '<nav> identifies major site navigation.' }
  ];

  const form = $('#quiz', el);
  questions.forEach((it, i) => {
    const fs = document.createElement('fieldset');
    fs.innerHTML = `<legend>${i + 1}. ${it.q}</legend>`;
    it.a.forEach((opt, idx) => {
      const id = `q${i}-${idx}`;
      const label = document.createElement('label');
      label.style.display = 'block';
      label.innerHTML = `<input type="radio" name="q${i}" value="${idx}" id="${id}"> ${opt}`;
      fs.appendChild(label);
    });
    form.appendChild(fs);
  });

  $('#submit', el).addEventListener('click', () => {
    const data = new FormData(form);
    let score = 0, out = [];
    questions.forEach((it, i) => {
      const v = Number(data.get('q' + i));
      const correct = v === it.c;
      if (correct) score++;
      out.push(`${i + 1}. ${correct ? '✅ Correct' : '❌ Incorrect'} — ${it.e}`);
    });
    $('#result', el).innerHTML = `Score: ${score}/${questions.length}<br>` + out.join('<br>');

    const s = store.get();
    s.quizzes.html = { score, total: questions.length, last: Date.now() };
    store.set(s);
  });

  return el;
}

function Projects() {
  const el = document.createElement('section');
  el.className = 'grid cols-3';
  const briefs = [
    { title: '1) Accessible Profile Card', criteria: ['Semantic HTML', 'Keyboard focus', 'Responsive card', 'Alt text/images'] },
    { title: '2) Product List (Filter)', criteria: ['Flex/Grid layout', 'Filter by category', 'ARIA live updates', 'Mobile-first'] },
    { title: '3) Mini Quiz App', criteria: ['Questions from array', 'Score + review', 'LocalStorage', 'A11y forms'] }
  ];
  briefs.forEach(b => {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `<h2>${b.title}</h2><ul>${b.criteria.map(x => `<li>${x}</li>`).join('')}</ul>`;
    el.appendChild(c);
  });
  return el;
}

function Glossary() {
  const el = document.createElement('section');
  el.className = 'grid cols-2';
  const terms = {
    'Semantic HTML': 'Using elements that convey meaning and structure.',
    'Box Model': 'How content, padding, border, margin define layout.',
    'ARIA': 'Accessible Rich Internet Applications — adds semantics.',
    'Event Bubbling': 'Events propagate from target up the DOM tree.'
  };
  Object.entries(terms).forEach(([k, v]) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h2>${k}</h2><p class="small">${v}</p>`;
    el.appendChild(card);
  });
  return el;
}

function Progress() {
  const s = store.get();
  const el = document.createElement('section');
  el.className = 'card';
  const pct = overallProgress(s);
  el.innerHTML = `
    <h1>Your Progress</h1>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <p class="small">${pct}% complete • Badges: ${s.badges.join(', ') || 'None'}</p>
    <div style="display:flex; gap:.5rem">
      <button class="btn" id="export">Export JSON</button>
      <label class="btn" for="importFile" style="display:inline-block">Import JSON<input id="importFile" type="file" accept="application/json" style="display:none"></label>
    </div>
    <pre id="dump" class="small" style="white-space:pre-wrap"></pre>
  `;
  $('#export', el).addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(store.get(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'felearn-progress.json'; a.click();
    URL.revokeObjectURL(url);
  });
  $('#importFile', el).addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    file.text().then(txt => { try { store.set(JSON.parse(txt)); alert('Progress imported!'); render(); } catch { alert('Invalid file.'); } });
  });
  $('#dump', el).textContent = JSON.stringify(store.get(), null, 2);
  return el;
}

function Settings() {
  const s = store.get();
  const el = document.createElement('section');
  el.className = 'card';
  el.innerHTML = `
    <h1>Settings</h1>
    <div style="display:flex; gap:.5rem; align-items:center">
      <label>Font size
        <select id="fontSize">
          <option value="base">Base</option>
          <option value="lg">Large</option>
          <option value="xl">XL</option>
        </select>
      </label>
      <button class="btn" id="reset">Reset Progress</button>
    </div>
  `;
  $('#fontSize', el).value = s.fontSize;
  $('#fontSize', el).addEventListener('change', (e) => {
    const st = store.get();
    st.fontSize = e.target.value; store.set(st);
    applyFontSize(e.target.value);
  });
  $('#reset', el).addEventListener('click', () => {
    if (confirm('Reset all progress?')) { localStorage.removeItem(STORAGE_KEY); location.reload(); }
  });
  return el;
}

function NotFound() {
  const el = document.createElement('section');
  el.className = 'card';
  el.innerHTML = `<h1>Not found</h1><p class="small">That page does not exist.</p>`;
  return el;
}

// --------------------- Helpers ---------------------
function overallProgress(s) {
  const lessonTotal = 9; // 3 per module in MVP
  const lessonDone = Object.values(s.lessons).flatMap(m => Object.values(m)).filter(Boolean).length;
  const quizDone = s.quizzes.html?.score ? 1 : 0; // MVP has one quiz
  const challengeDone = Object.keys(s.challenges).length; // future use
  const denom = lessonTotal + 1 + 3; // lessons + 1 quiz + (target) 3 challenges
  const num = lessonDone + quizDone + Math.min(challengeDone, 3);
  return Math.round((num / denom) * 100);
}

function applyFontSize(size) {
  document.body.style.fontSize = size === 'lg' ? '18px' : size === 'xl' ? '20px' : '16px';
}
