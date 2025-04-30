import { setupRouter, navigateTo } from "./router.js";
import { fetchMarkdown } from "./markdown.js";

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
