export default function Glossary() {
    const el = document.createElement("section");
    el.className = "grid cols-2";
    const terms = {
      "Semantic HTML": "Using elements that convey meaning and structure.",
      "Box Model": "How content, padding, border, margin define layout.",
      "ARIA": "Accessible Rich Internet Applications — adds semantics.",
      "Event Bubbling": "Events propagate from target up the DOM tree.",
    };
    Object.entries(terms).forEach(([k, v]) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h2>${k}</h2><p class="small">${v}</p>`;
      el.appendChild(card);
    });
    return el;
  }
  