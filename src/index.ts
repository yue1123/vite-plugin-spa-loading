import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import { minify } from 'uglify-js'
import { minify as htmlMinify } from 'html-minifier'

export interface BaseOptions {
  /**
   * app mount element ID
   * @example vue: <div id="app"></div> ==> app
   * @example react: <div id="root"></div> ==> root
   */
  rootElementId?: string
  /**
   * Development environment whether enable.
   * @default false
   */
  devEnable?: boolean
  /**
   * If the existing style is not suitable, you can customize the css through this option
   */
  css?: string
  /**
   * Same as `options.css`, but imported css by file path
   */
  cssPath?: string
  /**
   * Loading placeholder content tip text.
   * @default Loading...
   */
  tipText?: string
  /**
   * Prevent the loading animation from flashing when the network is good.
   */
  debounce?: number

  /**
   * error handle config
   */
  error?: {
    /**
     * error tip text
     */
    tip?: string
    /**
     * show error details
     */
    detail?: boolean
    /**
     * error handle callback
     * @param error error list
     * @example // error retry
     *  const search = window.location.search
          const reloadNum = +search.match(/slr=(\d+)/)?.[1] || 1
          if (reloadNum < 3) location.reload(true)
    * @returns void
    */
    handler?: (error: string[]) => void
  }
}

//  text loading
// this is default
export interface Text extends BaseOptions {}

// provide a image for loading
export interface Image extends BaseOptions {
  /**
   * Specify the file path of the image. It is recommended to use `base64` images, avoid network loading affecting rendering.
   */
  src: string
}

// use svg loading animation for loading
interface _Svg extends BaseOptions {
  /**
   * Specify the svg content
   */
  content?: string
  /**
   * Specify the svg file path
   */
  path?: string
}

export type LoadingPlaceholderType = 'text' | 'img' | 'svg'
export type Svg = _Svg & ({ content: string } | { path: string })

export type Options = Text | Image | Svg
export function spaLoading(type: 'text', options?: Text): Plugin
export function spaLoading(type: 'img', options?: Image): Plugin
export function spaLoading(type: 'svg', options?: Svg): Plugin
export function spaLoading(type: LoadingPlaceholderType = 'text', options: any): Plugin {
  const defaultOptions = {
    tipText: 'Loading...',
    rootElementId: 'app',
    debounce: 150,
    devEnable: false,
    css: '',
    cssPath: '',
    error: {
      tip: 'ERROR: ',
      detail: false,
      handler: () => {}
    }
  }
  options.error = Object.assign(defaultOptions.error, options.error)
  options = Object.assign(defaultOptions, options)
  let root = process.cwd()
  let appNodeRegexp = new RegExp(`<div id="${options.rootElementId}">([\\w\\W]*)<\\/div>`, 'gim')
  const aniMap: Record<LoadingPlaceholderType, any> = {
    img: (config: Image) => `<img src="${config.src}" alt="loading img">`,
    svg: (config: Svg) => config.content,
    text: () => ''
  }
  let isProd = false
  const renderTemplate = (config: Options, externalStyle: string = '') => {
    const halfDebounce = config.debounce! / 2
    const errorConfig = config.error!
    const script = `try {
  const options = { handler: ${errorConfig.handler!.toString().replace('handler', 'function')}};
  const errorSourceList = [];
  let id;
  let fn = (event) => {
    if(!document.getElementById('vite-plugin-spa-loading')) {
      window.removeEventListener('error', fn)
      return
    }
    errorSourceList.push(event);
    id && (id = window.cancelAnimationFrame(id));
    id = window.requestAnimationFrame(() => {
      renderError(errorSourceList);
      options.handler(errorSourceList);
    })
  }
  window.addEventListener('error', fn, true)

  function renderError(errorList) {
    const container = document.getElementById('vite-plugin-spa-loading');
    if (container) {
      container.innerHTML =
        [
          '<div class="spa-loading-error-title">${errorConfig.tip}\\n\\n</div>',
          ${errorConfig.detail ? "`<pre class='spa-loading-error'>${errorList.join('\\n')}</pre>`" : ''}
        ].join('\\n');
    }
  }
  } catch (err) {}`
    const html = `
      <style id="internal-css">
        .spa-loading-error{
          color: #b75555;
        } 
        .loading-container {
          opacity: 0; 
          animation: fade-in ${halfDebounce + 100}ms linear ${halfDebounce}ms forwards; 
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw; 
          height: 100vh; 
          display: flex; 
          justify-content: center; 
          flex-direction: column; 
          align-items: center; 
        }
        @keyframes fade-in {
          0% { 
            opacity: 0;
          } 
          100% { 
            opacity: 1;
          } 
        } 
        @-moz-keyframes fade-in {
          0% { 
            opacity: 0; 
          } 
          100% { 
            opacity: 1;
          } 
        } 
        @-webkit-keyframes fade-in {
          0% { 
            opacity: 0; 
          } 
          100% { 
            opacity: 1; 
          } 
        }
      </style>
      ${config.css ? `<style id="user-css">${config.css}</style>` : ''}
      ${externalStyle !== '' ? `<style id="external-css">${externalStyle}</style>` : ''}
      <div id="vite-plugin-spa-loading" class="loading-container ${type}-loading">
        <div class="loading-ani">${aniMap[type](config)}</div>
        ${config.tipText ? `<div class="loading-text">${config.tipText}</div>` : ''}
      </div>`

    return `
      ${isProd ? htmlMinify(html, { minifyCSS: true }) : html}
      <script>${isProd ? minify(script).code : script}</script>`
  }

  const errorLog = (content: string) => {
    console.log('\n')
    console.log('\x1b[31m%s%s\x1b[0m', '✘ [spa-loading] - ', content)
    console.log()
  }
  const getFileContent = (src: string) => {
    try {
      return readFileSync(src, { encoding: 'utf-8' }).toString()
    } catch (error: any) {
      errorLog(error.message)
      return ''
    }
  }
  return {
    name: 'spa-loading',
    enforce: 'post',
    config(_, { command }) {
      isProd = command === 'build'
    },
    transformIndexHtml(index) {
      if (!options.devEnable && !isProd) return
      if (type === 'svg' && options.path) {
        options.content = getFileContent(resolve(root, options.path))
      }
      let cssContent: string = ''
      if (options.cssPath !== '') {
        cssContent = getFileContent(resolve(root, options.cssPath))
      }
      return index.replace(appNodeRegexp, (_: string, content: string) => {
        return `<div id="${options.rootElementId}">
          ${content}${renderTemplate(options, cssContent)}
    <\/div>`
      })
    }
  }
}
