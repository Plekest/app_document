import { filterMarkdown } from "./markdown.js";
import { renderLanguagePrism } from "./render.js";
import { frameworks } from "../env.js";

export function setupRouter(rawMarkdown = null) {
  const router = new Navigo("/", { hash: false });

  async function renderContentLanguage(framework) {
    const path = `/docs/${framework}-local-storage/getting-started/`;
    let content = localStorage.getItem(path);

    if (!content && rawMarkdown) {
      const filtered = filterMarkdown(rawMarkdown, framework);
      content = filtered.join("\n\n");
    }

    renderLanguagePrism(content || `<p>Nenhum conteúdo encontrado para ${framework}.</p>`);
  }

  if (rawMarkdown) {
    frameworks().forEach((framework) => {
      const route = `/docs/${framework}-data-grid/getting-started/`;
      router.on(route, () => renderContentLanguage(framework));
    });
  } else {
    const keys = Object.keys(localStorage).filter((k) =>
      /^\/docs\/([a-zA-Z0-9]+)-local-storage\/getting-started\/$/.test(k)
    );

    keys.forEach((key) => {
      const match = key.match(/^\/docs\/([a-zA-Z0-9]+)-local-storage\/getting-started\/$/);
      if (match) {
        const framework = match[1];
        router.on(key, () => renderContentLanguage(framework));
      }
    });
  }

  router.on("/", () => {
    renderContentLanguage("html");
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