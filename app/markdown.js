import { routeFileMD, frameworks } from "../env.js";

export async function fetchMarkdown() {
  const res = await fetch(routeFileMD());

  if (!res.ok) {
    throw new Error(
      `Erro ao buscar o arquivo Markdown: ${res.status} ${res.statusText}`
    );
  }

  return await res.text();
}

export async function fetchMarkdownFileDownload() {
  const res = await fetch(routeFileMD());

  if (!res.ok) {
    throw new Error(`Failed to fetch file: ${res.statusText}`);
  }

  const content = await res.text();

  frameworks().forEach((framework) => {
    const regex = new RegExp(
      "```" + framework + "[^\\n]*\\n([\\s\\S]*?)```",
      "g"
    );
    const matches = [...content.matchAll(regex)];

    const combined = matches.map((m) => m[1].trim()).join("\n\n");

    if (combined) {
      const storageKey = `/docs/${framework}-local-storage/getting-started/`;
      localStorage.setItem(storageKey, combined);
      console.log(`Blocos de ${framework} salvos em ${storageKey}`);
    }
  });

  return content;
}

export function filterMarkdown(raw, framework) {
  const regex = new RegExp("```" + framework + "[^\n]*\n([\\s\\S]*?)```", "g");
  const matches = [...raw.matchAll(regex)];
  return matches.map((m) => m[1].trim());
}

export function renderMarkdown(rawMarkdown) {
  const html = marked.parse(rawMarkdown);
  const container = document.getElementById("doc-content-index");
  if (container) {
    container.innerHTML = html;
  } else {
    console.warn("Elemento 'doc-content-index' não encontrado no DOM.");
  }
}

export function removeCodeBlocksByFrameworks(raw) {
  let cleaned = raw;

  frameworks().forEach((framework) => {
    const regex = new RegExp(
      "```" + framework + "[^\\n]*\\n([\\s\\S]*?)```",
      "g"
    );
    cleaned = cleaned.replace(regex, "");
  });

  return cleaned;
}

export function stripBeforeFirstHeading(rawMarkdown) {
  const index = rawMarkdown.search(/^#/m);
  return index !== -1 ? rawMarkdown.slice(index) : rawMarkdown;
}
