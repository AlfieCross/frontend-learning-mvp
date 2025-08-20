export const STORAGE_KEY = "felearn.v1";

export function defaultState() {
  return {
    lessons: { html: {}, css: {}, js: {} },
    quizzes: { html: null, css: null, js: null },
    challenges: {},           // e.g., { "id": { completed:true, at: 123 } }
    badges: [],
    theme: "dark",
    fontSize: "base",
  };
}

export const store = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState();
    } catch {
      return defaultState();
    }
  },
  set(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
