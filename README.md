# vite-plugin-app-loading

![npm](https://img.shields.io/npm/v/vite-plugin-app-loading?style=flat-square)
![npm](https://img.shields.io/npm/dm/vite-plugin-app-loading?style=flat-square)
![GitHub](https://img.shields.io/github/license/yue1123/vite-plugin-app-loading?style=flat-square)


[简体中文](./README.zh.md)


Spa application first screen loading placeholder plugin, out of the box.

## 📦 Install

```shell
npm i vite-plugin-app-loading -D

# yarn
yarn add vite-plugin-app-loading -D

# pnpm
pnpm add vite-plugin-app-loading -D
```

## 🦄 Usage

Add viteAppLoading plugin to vite.config.js / vite.config.ts and configure it:

```ts
// vite.config.js / vite.config.ts
import { viteAppLoading } from 'vite-plugin-app-loading'

export default {
  plugins: [viteAppLoading()]
}
```

## Overview

### text loading placeholder

```ts
import { viteAppLoading } from 'vite-plugin-app-loading'

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
import { viteAppLoading } from 'vite-plugin-app-loading'

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
import { viteAppLoading } from 'vite-plugin-app-loading'

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

#### type

- Type: `'text' | 'img' | 'svg'`

Loading placeholder content type.

#### loadingText

- Type: `string`

Loading placeholder content tip text.

#### devEnable

- Type: `boolean`
- Default: `false`

Development environment whether enable.

#### debounce

- Type: `number`
- Default: `300`

Prevent the loading animation from flashing when the network is good.

#### src

- Type: `string`

Specify the URL of the image if type is `img`. It is recommended to use base64 images, avoid network loading affecting rendering.

#### svgContent

- Type: `string`

Specify the svg content if type is `svg`.

#### svgPath

- Type: `string`

Specify the svg source path if type is `svg`.

#### css

- Type: `string`

If the existing style is not suitable, you can customize the css through this option

## License

[MIT licenses](https://opensource.org/licenses/MIT)
