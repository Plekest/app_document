import { filterMarkdown } from "./markdown.js";
import { renderHtml } from "./render.js";

export function setupRouter(rawMarkdown) {
  const router = new Navigo("/", { hash: false });

  function renderContent(framework) {
    const filtered = filterMarkdown(rawMarkdown, framework);
    if (!filtered) {
      renderHtml(`<p>Nenhum conteúdo encontrado para ${framework}.</p>`);
    } else {
      renderHtml(filtered);
    }
  }

  router.on("/docs/:framework-data-grid/getting-started/", ({ data }) => {
    const framework = data.framework;
    renderContent(framework);
  });

  router.on("/", () => {
    renderContent("jsx");
  });

  router.resolve();
  window.router = router;
}

export function navigateTo(framework) {
  window.router.navigate(`/docs/${framework}-data-grid/getting-started/`);
}
