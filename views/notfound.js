export default function NotFound() {
    const el = document.createElement("section");
    el.className = "card";
    el.innerHTML = `<h1>Not found</h1><p class="small">That page does not exist.</p>`;
    return el;
  }
  