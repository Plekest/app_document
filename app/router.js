import { filterMarkdown } from "./markdown.js";
import { renderHtml } from "./render.js";

export function setupRouter(rawMarkdown = null) {
  const router = new Navigo("/", { hash: false });

  async function renderContent(framework) {
    const path = `/docs/${framework}-local-storage/getting-started/`;
    let content = localStorage.getItem(path);

    if (!content && rawMarkdown) {
      const filtered = filterMarkdown(rawMarkdown, framework);
      content = filtered.join("\n\n");
    }

    renderHtml(content || `<p>Nenhum conteúdo encontrado para ${framework}.</p>`);
  }

  if (rawMarkdown) {
    const frameworks = ["jsx", "angularjs", "vue"];
    frameworks.forEach((framework) => {
      const route = `/docs/${framework}-data-grid/getting-started/`;
      router.on(route, () => renderContent(framework));
    });
  } else {
    const keys = Object.keys(localStorage).filter((k) =>
      /^\/docs\/([a-zA-Z0-9]+)-local-storage\/getting-started\/$/.test(k)
    );

    keys.forEach((key) => {
      const match = key.match(/^\/docs\/([a-zA-Z0-9]+)-local-storage\/getting-started\/$/);
      if (match) {
        const framework = match[1];
        router.on(key, () => renderContent(framework));
      }
    });
  }

  router.on("/", () => {
    renderContent("jsx");
  });

  router.resolve();
  window.router = router;
}

export function navigateTo(framework) {
  const isLocal = localStorage.getItem(`/docs/${framework}-local-storage/getting-started/`);
  const path = isLocal
    ? `/docs/${framework}-local-storage/getting-started/`
    : `/docs/${framework}-data-grid/getting-started/`;

  window.router.navigate(path);
}