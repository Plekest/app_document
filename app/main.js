import { setupRouter, navigateTo } from "./router.js";
import { fetchMarkdown, fetchMarkdownFileDownload } from "./markdown.js";
import { downloadFileMD } from "../env.js";

document.addEventListener("DOMContentLoaded", async () => {
  if (downloadFileMD() === true) {
    console.log("Baixando e salvando Markdown...");
    await fetchMarkdownFileDownload();
    setupRouter();
  } else {
    console.log("Carregando Markdown da web...");
    const markdown = await fetchMarkdown();
    setupRouter(markdown);
  }

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
