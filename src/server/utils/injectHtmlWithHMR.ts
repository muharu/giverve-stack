import { readFile } from "fs/promises";
import { isProduction } from "./isProduction";

const injectHtmlWithHMR = async () => {
  let html;
  if (isProduction) {
    html = await readFile("./dist/index.html", "utf-8");
  } else {
    html = await readFile("./index.html", "utf-8");
    // Inject Vite client code to the HTML
    html = html.replace(
      "<head>",
      `
      <script type="module">
        import RefreshRuntime from "/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>

      <script type="module" src="/@vite/client"></script>
      <head>
      `
    );
  }

  return html;
};

export { injectHtmlWithHMR };
