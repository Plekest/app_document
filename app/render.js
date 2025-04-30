import { language } from "../env.js";

export function renderLanguagePrism(markdown) {
  const encoded = Prism.util.encode(markdown);
  const block = `<pre><code class="language-${language()}">${encoded}</code></pre>`;
  const container = document.getElementById("doc-content-language");
  if (container) {
    container.innerHTML = block;
    Prism.highlightAll();
  } else {
    console.warn("Elemento 'doc-content-language' não encontrado.");
  }
  Prism.highlightAll();
}
