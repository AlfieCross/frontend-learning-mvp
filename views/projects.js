export default function Projects() {
    const el = document.createElement("section");
    el.className = "grid cols-3";
    const briefs = [
      { title: "Accessible Profile Card", criteria: ["Semantic HTML", "Keyboard focus", "Responsive card", "Alt text/images"] },
      { title: "Product List (Filter)", criteria: ["Flex/Grid layout", "Filter by category", "ARIA live updates", "Mobile-first"] },
      { title: "Mini Quiz App", criteria: ["Questions from array", "Score + review", "LocalStorage", "A11y forms"] },
    ];
    briefs.forEach((b) => {
      const c = document.createElement("div");
      c.className = "card";
      c.innerHTML = `<h2>${b.title}</h2><ul>${b.criteria.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      el.appendChild(c);
    });
    return el;
  }
  