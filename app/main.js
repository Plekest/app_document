import { setupRouter, navigateTo } from "./router.js";
import { fetchMarkdown, fetchMarkdownFileDownload, renderMarkdown, removeCodeBlocksByFrameworks, stripBeforeFirstHeading } from "./markdown.js";
import { downloadFileMD, frameworks } from "../env.js";

document.addEventListener("DOMContentLoaded", async () => {

  const fetchRawMarkdown = await fetchMarkdown();
  const cleanedMD = removeCodeBlocksByFrameworks(fetchRawMarkdown);
  const indexMD = stripBeforeFirstHeading(cleanedMD);
  renderMarkdown(indexMD);

  const hasSavedData = frameworks().some((fw) =>
    localStorage.getItem(`/docs/${fw}-local-storage/getting-started/`)
  );

  if (downloadFileMD() == 1) {
    console.log("Baixando e salvando Markdown...");
    await fetchMarkdownFileDownload();
    setupRouter();
  } else if (hasSavedData) {
    console.log("Usando Markdown salvo no localStorage...");
    setupRouter();
  } else {
    console.log("Carregando Markdown da web...");
    setupRouter(fetchRawMarkdown);
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
