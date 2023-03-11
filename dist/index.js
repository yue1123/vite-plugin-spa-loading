import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
export function viteAppLoading(options = {
    type: 'text',
    loadingText: 'loading...'
}) {
    let root = process.cwd();
    let appNodeRegexp = /<div id="app">([\w\W]*)<\/div>/gim;
    const defaultOptions = { debounce: 300 };
    const aniMap = {
        img: (config) => `<img src="${config.src}" alt="loading img">`,
        svg: (config) => config.svgContent,
        text: () => ''
    };
    const renderTemplate = (config) => {
        return `
    <style id="internal-css"> .loading-container { opacity: 0; animation: fade-in ${config.debounce + 300}ms linear ${Math.max(config.debounce - 300, 0)}ms forwards; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; justify-content: center; flex-direction: column; align-items: center; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-webkit-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } </style>
    ${config.css ? `<style id="user-css">${config.css}</style>` : ''}
    <div class="loading-container ${config.type}-loading"><div class="loading-ani">${aniMap[config.type](config)}</div>${config.loadingText ? `<div class="loading-text">${config.loadingText}</div>` : ''}</div>`;
    };
    const tenser = (str) => str.replace(/\s{2,99}/g, ' ');
    let isProd = false;
    options = Object.assign(defaultOptions, options);
    return {
        name: 'vite-plugin-app-loading',
        enforce: 'post',
        config(_, { command }) {
            isProd = command === 'build';
        },
        transformIndexHtml(index) {
            if (!options.devEnable && !isProd)
                return;
            if (options.type === 'svg' && options.path) {
                options.svgContent = readFileSync(resolve(root, options.path)).toString();
            }
            return tenser(index.replace(appNodeRegexp, (_, content) => {
                return `<div id="app">\n${content}\n${renderTemplate(options)}\n<\/div>`;
            }));
        }
    };
}
