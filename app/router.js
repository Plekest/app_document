import { filterMarkdown } from "./markdown.js";
import { renderLanguagePrism } from "./render.js";
import { frameworkMap } from "../env.js";

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
    Object.entries(frameworkMap()).forEach(([real, alias]) => {
      const route = `/docs/${alias}-data-grid/getting-started/`;
      router.on(route, () => renderContentLanguage(real));
    });
  } else {
    const keys = Object.keys(localStorage).filter((k) =>
      /^\/docs\/([a-zA-Z0-9]+)-local-storage\/getting-started\/$/.test(k)
    );
    
    keys.forEach((key) => {
      const match = key.match(/^\/docs\/([a-zA-Z0-9]+)-local-storage\/getting-started\/$/);
      if (match) {
        const alias = match[1];
        router.on(key, () => renderContentLanguage(alias));
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
  const alias = frameworkMap()[framework] || framework;

  const isLocal = localStorage.getItem(`/docs/${alias}-local-storage/getting-started/`);
  const path = isLocal
    ? `/docs/${alias}-local-storage/getting-started/`
    : `/docs/${alias}-data-grid/getting-started/`;

  window.router.navigate(path);
}
