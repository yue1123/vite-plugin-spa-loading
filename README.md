# vite-plugin-spa-loading

![npm](https://img.shields.io/npm/v/vite-plugin-spa-loading?style=flat-square)
![npm](https://img.shields.io/npm/dm/vite-plugin-spa-loading?style=flat-square)
![GitHub](https://img.shields.io/github/license/yue1123/vite-plugin-spa-loading?style=flat-square)

[简体中文](./README.zh.md)

Out of the box spa application first screen loading placeholder plugin, avoid long time white screen before app launch.

## 📦 Install

```shell
npm i vite-plugin-spa-loading -D

# yarn
yarn add vite-plugin-spa-loading -D

# pnpm
pnpm add vite-plugin-spa-loading -D
```

## 🦄 Usage

Add viteAppLoading plugin to vite.config.js / vite.config.ts and configure it:

```ts
// vite.config.js / vite.config.ts
import { viteAppLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [viteAppLoading()]
}
```

## Overview

### text loading placeholder

```ts
import { viteAppLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [
    viteAppLoading({
      type: 'text',
      loadingText: 'The loading text...'
    })
  ]
}
```

### svg loading placeholder

```ts
import { viteAppLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [
    viteAppLoading({
      type: 'svg',
      path: 'xxx/loading.svg'
      // or
      // svgContent: '<svg>....</svg>'
    })
  ]
}
```

### img loading placeholder

```ts
import { viteAppLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [
    viteAppLoading({
      type: 'img',
      src: 'xxx/loading.gif'
    })
  ]
}
```

## ⚙️ Configuration

```ts
spaLoading(type, { options... })
```

### type

- Type: `'text' | 'img' | 'svg'`
- Default: `'text'`

Loading placeholder content type.

### options.rootElementId

- Type: `string`
- Default: `app`

app mount element ID

### options.tipText

- Type: `string`
- Default: `loading...`

Loading placeholder content tip text.

### options.devEnable

- Type: `boolean`
- Default: `true`

Development environment whether enable.

### options.debounce

- Type: `number`
- Default: `150`

Prevent the loading animation from flashing when the network is good.

### options.src

- Type: `string`

Specify the URL of the image if type is `img`. It is recommended to use base64 images, avoid network loading affecting rendering.

### options.content

- Type: `string`

Specify the svg content if type is `svg`.

### options.path

- Type: `string`

Specify the svg source path if type is `svg`.

### options.css

- Type: `string`

If the existing style is not suitable, you can customize the css through this option

## License

[MIT licenses](https://opensource.org/licenses/MIT)
