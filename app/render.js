import { language } from "../env.js";

export function renderHtml(markdown) {
  const encoded = Prism.util.encode(markdown);
  const block = `<pre><code class="language-${language()}">${encoded}</code></pre>`;
  document.getElementById("doc-content").innerHTML = block;
  Prism.highlightAll();
}
