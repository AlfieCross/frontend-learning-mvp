import { $, $$, applyFontSize } from "./utils.js";
import { store } from "./store.js";

import Home from "./views/home.js";
import Learn from "./views/learn.js";
import Challenges from "./views/challenges.js";
import Quizzes from "./views/quizzes.js";
import Projects from "./views/projects.js";
import Glossary from "./views/glossary.js";
import Progress from "./views/progress.js";
import Settings from "./views/settings.js";
import NotFound from "./views/notfound.js";

const routes = {
    "/": Home,
    "/learn": Learn,
    "/challenges": Challenges,
    "/quizzes": Quizzes,
    "/projects": Projects,
    "/glossary": Glossary,
    "/progress": Progress,
    "/settings": Settings,
};

function highlightNav(path) {
    $$(".sidebar nav a").forEach((a) => {
        if (a.getAttribute("href") === `#${path}`) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
    });
}

function render() {
    const path = location.hash.slice(1) || "/";
    const view = routes[path] || NotFound;
    const app = $("#app");
    app.innerHTML = "";
    app.appendChild(view());    // view returns a DOM element
    app.focus();                // move focus for a11y
    highlightNav(path);
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
    // Theme init & toggle
    const s = store.get();
    if (s.theme === "light") document.documentElement.classList.add("light");
    applyFontSize(s.fontSize);

    const toggle = $("#themeToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const st = store.get();
            const isLight = document.documentElement.classList.toggle("light");
            st.theme = isLight ? "light" : "dark";
            toggle.setAttribute("aria-pressed", String(isLight));
            store.set(st);
        });
    }

    render();
});
