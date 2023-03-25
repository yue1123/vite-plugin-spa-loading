import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";

export interface BaseOptions {
  rootElementId?: string;
  devEnable?: boolean;
  css?: string;
  cssPath?: string;
  tipText?: string;
  debounce?: number;
}

//  text loading
// this is default
export interface Text extends BaseOptions {}

// provide a image for loading
export interface Image extends BaseOptions {
  src: string;
}

// use svg loading animation for loading
interface _Svg extends BaseOptions {
  content?: string;
  path?: string;
}
export type LoadingPlaceholderType = "text" | "img" | "svg";
export type Svg = _Svg & ({ content: string } | { path: string });

export type Options = Text | Image | Svg;
export function spaLoading(type: "text", options?: Text): Plugin;
export function spaLoading(type: "img", options?: Image): Plugin;
export function spaLoading(type: "svg", options?: Svg): Plugin;
export function spaLoading(
  type: LoadingPlaceholderType = "text",
  options: any
): Plugin {
  const defaultOptions = {
    tipText: "Loading...",
    rootElementId: "app",
    debounce: 150,
    devEnable: true,
    css: "",
    cssPath: "",
  };
  options = Object.assign(defaultOptions, options);

  let root = process.cwd();

  let appNodeRegexp = new RegExp(
    `<div id="${options.rootElementId}">([\\w\\W]*)<\\/div>`,
    "gim"
  );
  const aniMap: Record<LoadingPlaceholderType, any> = {
    img: (config: Image) => `<img src="${config.src}" alt="loading img">`,
    svg: (config: Svg) => config.content,
    text: () => "",
  };

  const renderTemplate = (config: Options, externalStyle: string = "") => {
    const halfDebounce = config.debounce! / 2;
    return `<style id="internal-css">.vite-plugin-spa-loading-error{color: #b75555;} .loading-container { opacity: 0; animation: fade-in ${
      halfDebounce + 100
    }ms linear ${halfDebounce}ms forwards; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; justify-content: center; flex-direction: column; align-items: center; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-webkit-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } </style>
    ${config.css ? `<style id="user-css">${config.css}</style>` : ""}\n
    ${
      externalStyle !== ""
        ? `<style id="external-css">${externalStyle}</style>`
        : ""
    }
    <div id="vite-plugin-spa-loading" class="loading-container ${type}-loading"><div class="loading-ani">${aniMap[
      type
    ](config)}</div>${
      config.tipText ? `<div class="loading-text">${config.tipText}</div>` : ""
    }</div>
    <script>const errorSourceList = []; let id; window.addEventListener('error', (event) => { if (!(event instanceof ErrorEvent)) { try { const target = event.target || event.srcElement; if ( target instanceof HTMLElement && ['LINK', 'SCRIPT'].indexOf(target.nodeName) !== -1 ) { const src = target.src || target.href; if (window.location.href.indexOf(src) !== 0) { errorSourceList.push('GET - ' + src + ' - net::ERR_ABORTED 404 (Not Found)'); id && window.cancelAnimationFrame(id); id = window.requestAnimationFrame(() => { renderError(errorSourceList); }) } } } catch (err) {} } }, true ); function renderError(errorList) { const container = document.getElementById('vite-plugin-spa-loading'); if (container) { container.innerHTML = '<pre class="vite-plugin-spa-loading-error">ERROR: \\n\\n' + errorList.join('\\n') + '</pre>'; } }</script>
    `;
  };

  const tenser = (str: string) => str.replace(/\s{2,99}/g, " ");
  let isProd = false;
  return {
    name: "vite-plugin-spa-loading",
    enforce: "post",
    config(_, { command }) {
      isProd = command === "build";
    },
    transformIndexHtml(index) {
      if (!options.devEnable && !isProd) return;
      if (type === "svg" && options.path) {
        options.content = readFileSync(resolve(root, options.path)).toString();
      }

      let cssContent: string = "";
      if (options.cssPath !== "") {
        cssContent = readFileSync(resolve(root, options.cssPath)).toString();
      }

      return index.replace(appNodeRegexp, (_: string, content: string) => {
        return tenser(
          `<div id="${options.rootElementId}">\n${content}\n${renderTemplate(
            options,
            cssContent
          )}\n<\/div>`
        );
      });
    },
  };
}
