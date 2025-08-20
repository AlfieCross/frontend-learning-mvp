export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

export function esc(str = "") {
  return String(str).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function applyFontSize(size) {
  document.body.style.fontSize = size === "lg" ? "18px" : size === "xl" ? "20px" : "16px";
}
