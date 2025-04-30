// ================================
// ⚙️ Configuration Environment File
// Created to centralize environment variables and helpers
// ================================

/**
 * Returns the URL of the Markdown documentation file hosted on GitHub.
 * This file is used as the primary data source for rendering documentation.
 *
 * @function
 * @returns {string} - The URL of the Markdown file
 */
export function routeFileMD() {
  return "https://raw.githubusercontent.com/Plekest/app_document/main/docs/docs.md";
}

/**
 * Returns the default programming language to be rendered initially.
 * Used when no language is specified in the route.
 *
 * @function
 * @returns {string} - A language key like 'html', 'javascript', etc.
 */
export function language() {
  return "javascript";
}

/**
 * Controls whether the Markdown file should be downloaded and cached into localStorage.
 * If this returns `true`, all framework blocks will be saved for offline access.
 *
 * @function
 * @returns {boolean}
 */
export function downloadFileMD() {
  return false;
}

/**
 * Returns the list of framework types to be excluded when rendering the index/homepage.
 * These will be stripped from the Markdown on the landing page.
 *
 * @function
 * @returns {Array<string>}
 */
export function frameworksIndex() {
  return ["jsx", "vue", "angularjs"];
}

/**
 * Provides a map between real Markdown block languages and their URL-friendly aliases.
 * This map is used to build clean, semantic URLs.
 *
 * Key   = real language used in Markdown blocks
 * Value = alias used in the route (must be unique)
 *
 * @function
 * @returns {Object<string, string>} - Map of real name → alias
 */
export function frameworkMap() {
  return {
    html: "javascript",
    jsx: "react",
    vue: "vue",
    angularjs: "angular",
  };
}

/**
 * ❗ Do not modify below this line unless you know what you're doing.
 * These functions are used internally for reverse mapping and system behavior.
 * ===================================================================================
 */

/**
 * Returns the array of aliases (used in URLs) extracted from the framework map.
 *
 * @function
 * @returns {Array<string>} - Route-safe alias names
 */
export function frameworkAliases() {
  return Object.values(frameworkMap());
}

/**
 * Returns the list of real framework identifiers present in the Markdown file.
 * These are the actual block types like ```jsx, ```vue, etc.
 *
 * @function
 * @returns {Array<string>} - Real language identifiers used in Markdown.
 */
export function frameworks() {
  return Object.keys(frameworkMap());
}
