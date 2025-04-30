import { setupRouter, navigateTo } from "./router.js";
import { fetchMarkdown, fetchMarkdownFileDownload } from "./markdown.js";
import { downloadFileMD, frameworks } from "../env.js";

document.addEventListener("DOMContentLoaded", async () => {

  const hasSavedData = frameworks().some((fw) =>
    localStorage.getItem(`/docs/${fw}-local-storage/getting-started/`)
  );

  if (downloadFileMD() === true) {
    console.log("Baixando e salvando Markdown...");
    await fetchMarkdownFileDownload();
    setupRouter();
  } else if (hasSavedData) {
    console.log("Usando Markdown salvo no localStorage...");
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
