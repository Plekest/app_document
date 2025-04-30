// Criado somente como facilitador para testes e desenvolvimento de código.

/**
 * Returns the URL of a Markdown file hosted on GitHub.
 * This function is typically used to retrieve the location of an MD type documentation file.
 *
 * @function
 * @returns {string} The URL of the Markdown file.
 */
export function routeFileMD() {
    return 'https://raw.githubusercontent.com/Plekest/app_document/main/docs/docs.md';
}

/**
 * Returns the default programming language used in the environment.
 * This function is typically used to specify the language context.
 *
 * @function
 * @returns {string} The name of the programming language or markup language ('html', 'javascript').
 */
export function language() {
    return 'javascript';
}


/**
 * Checks if the MD file is to be downloaded, if true the data is saved in localstorage.
 *
 * @returns {string} Returns 'true' if the file is to be downloaded.
 */
export function downloadFileMD() {
    return false;
}

/**
 * Returns an array of frameworks to search in the markdown.
 *
 * @function
 * @returns {Array} An array of strings representing the names of the frameworks.
 */
export function frameworks() {
    return ['jsx', 'angularjs', 'vue'];
}