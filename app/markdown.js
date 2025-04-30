import { routeFileMD } from "../env.js";

export async function fetchMarkdown() {
  const res = await fetch(routeFileMD());
  return await res.text();
}

export async function fetchMarkdownFileDownload() {

  const res = await fetch(routeFileMD());
  
  if (!res.ok) {
    throw new Error(`Failed to fetch file: ${res.statusText}`);
  }

  const content = await res.text();
  
  const frameworks = ["jsx", "angularjs", "vue"];

  frameworks.forEach((framework) => {
    const regex = new RegExp("```" + framework + "[^\\n]*\\n([\\s\\S]*?)```", "g");
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
