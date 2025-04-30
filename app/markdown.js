import { routeFileMD } from "../env.js";

export async function fetchMarkdown() {
  const res = await fetch(routeFileMD());
  return await res.text();
}

export function filterMarkdown(raw, framework) {
  const regex = new RegExp("```" + framework + "[^\n]*\n([\\s\\S]*?)```", "g");
  const matches = [...raw.matchAll(regex)];
  return matches.map((m) => m[1].trim());
}
