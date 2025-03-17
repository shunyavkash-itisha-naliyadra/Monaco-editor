export const setupMonacoEnvironment = () => {
  window.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new Worker(
          "https://unpkg.com/monaco-editor@latest/esm/vs/language/json/json.worker.js",
          { type: "module" }
        );
      }
      if (["css", "scss", "less"].includes(label)) {
        return new Worker(
          "https://unpkg.com/monaco-editor@latest/esm/vs/language/css/css.worker.js",
          { type: "module" }
        );
      }
      if (["html", "handlebars", "razor"].includes(label)) {
        return new Worker(
          "https://unpkg.com/monaco-editor@latest/esm/vs/language/html/html.worker.js",
          { type: "module" }
        );
      }
      if (["typescript", "javascript"].includes(label)) {
        return new Worker(
          "https://unpkg.com/monaco-editor@latest/esm/vs/language/typescript/ts.worker.js",
          { type: "module" }
        );
      }
      return new Worker(
        "https://unpkg.com/monaco-editor@latest/esm/vs/editor/editor.worker.js",
        { type: "module" }
      );
    },
  };
};
