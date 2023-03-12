import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'

export interface BaseOptions {
  rootElementId?: string
  devEnable?: boolean
  css?: string
  tipText?: string
  debounce?: number
}

//  text loading
// this is default
export interface Text extends BaseOptions {}

// provide a image for loading
export interface Image extends BaseOptions {
  src: string
}

// use svg loading animation for loading
interface _Svg extends BaseOptions {
  content?: string
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
    tipText: 'loading...',
    rootElementId: 'app',
    debounce: 150,
    devEnable: true
  }
  options = Object.assign(defaultOptions, options)
  let root = process.cwd()
  let appNodeRegexp = new RegExp(`<div id="${options.rootElementId}">([\\w\\W]*)<\\/div>`, 'gim')
  const aniMap: Record<LoadingPlaceholderType, any> = {
    img: (config: Image) => `<img src="${config.src}" alt="loading img">`,
    svg: (config: Svg) => config.content,
    text: () => ''
  }
  const renderTemplate = (config: Options) => {
    return `
    <style id="internal-css"> .loading-container { opacity: 0; animation: fade-in ${
      config.debounce! + 150
    }ms linear ${Math.max(
      config.debounce! - 150,
      0
    )}ms forwards; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; justify-content: center; flex-direction: column; align-items: center; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-webkit-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } </style>
    ${config.css ? `<style id="user-css">${config.css}</style>` : ''}
    <div class="loading-container ${type}-loading"><div class="loading-ani">${aniMap[type](config)}</div>${
      config.tipText ? `<div class="loading-text">${config.tipText}</div>` : ''
    }</div>`
  }
  const tenser = (str: string) => str.replace(/\s{2,99}/g, ' ')
  let isProd = false
  return {
    name: 'vite-plugin-spa-loading',
    enforce: 'post',
    config(_, { command }) {
      isProd = command === 'build'
    },
    transformIndexHtml(index) {
      if (!options.devEnable && !isProd) return
      if (type === 'svg' && options.path) {
        options.content = readFileSync(resolve(root, options.path)).toString()
      }
      return index.replace(appNodeRegexp, (_: string, content: string) => {
        return tenser(`<div id="${options.rootElementId}">\n${content}\n${renderTemplate(options)}\n<\/div>`)
      })
    }
  }
}
