import { setupRouter, navigateTo } from "./app/router.js";
import { fetchMarkdown } from "./app/markdown.js";

document.addEventListener("DOMContentLoaded", async () => {
  const markdown = await fetchMarkdown();
  setupRouter(markdown);
  bindButtons();
});

function bindButtons() {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const fw = btn.dataset.framework;
      navigateTo(fw);
    });
  });
}
