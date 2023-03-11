import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { type Plugin } from 'vite'

interface BaseOptions {
  devEnable?: boolean
  css?: string
  loadingText?: string
  debounce?: number
}

//  text loading
// this is default
export interface TextLoading extends BaseOptions {
  type: 'text'
}

// provide a image for loading
export interface ImageLoading extends BaseOptions {
  type: 'img'
  src: string
}

// use svg loading animation for loading
interface _SvgLoading extends BaseOptions {
  type: 'svg'
  svgContent?: string
  path?: string
}
export type SvgLoading = _SvgLoading & ({ svg: string } | { src: string })

export type Options = TextLoading | ImageLoading | SvgLoading
export function viteAppLoading(
  options: Options = {
    type: 'text',
    loadingText: 'loading...'
  }
): Plugin {
  let root = process.cwd()
  let appNodeRegexp = /<div id="app">([\w\W]*)<\/div>/gim
  const defaultOptions = { debounce: 300 }
  const aniMap = {
    img: (config: ImageLoading) => `<img src="${config.src}" alt="loading img">`,
    svg: (config: SvgLoading) => config.svgContent,
    text: () => ''
  }
  const renderTemplate = (config: Options) => {
    return `
    <style id="internal-css"> .loading-container { opacity: 0; animation: fade-in ${
      config.debounce! + 300
    }ms linear ${Math.max(
      config.debounce! - 300,
      0
    )}ms forwards; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; justify-content: center; flex-direction: column; align-items: center; } @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-moz-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } @-webkit-keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } } </style>
    ${config.css ? `<style id="user-css">${config.css}</style>` : ''}
    <div class="loading-container ${config.type}-loading"><div class="loading-ani">${aniMap[config.type](
      config as any
    )}</div>${config.loadingText ? `<div class="loading-text">${config.loadingText}</div>` : ''}</div>`
  }
  const tenser = (str: string) => str.replace(/\s{2,99}/g, ' ')
  let isProd = false
  options = Object.assign(defaultOptions, options)
  return {
    name: 'vite-plugin-app-loading',
    enforce: 'post',
    config(_, { command }) {
      isProd = command === 'build'
    },
    transformIndexHtml(index) {
      if (!options.devEnable && !isProd) return
      if (options.type === 'svg' && options.path) {
        options.svgContent = readFileSync(resolve(root, options.path)).toString()
      }
      return tenser(
        index.replace(appNodeRegexp, (_: string, content: string) => {
          return `<div id="app">\n${content}\n${renderTemplate(options)}\n<\/div>`
        })
      )
    }
  }
}
