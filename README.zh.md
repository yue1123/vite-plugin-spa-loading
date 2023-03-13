# vite-plugin-spa-loading

![npm](https://img.shields.io/npm/v/vite-plugin-spa-loading?style=flat-square)
![npm](https://img.shields.io/npm/dm/vite-plugin-spa-loading?style=flat-square)
![GitHub](https://img.shields.io/github/license/yue1123/vite-plugin-spa-loading?style=flat-square)

[English](./README.md)

开箱即用的单页面应用程序首屏加载占位符插件，避免 app 启动前长时间的白屏。

## 📦 Install

```shell
npm i vite-plugin-spa-loading -D

# yarn
yarn add vite-plugin-spa-loading -D

# pnpm
pnpm add vite-plugin-spa-loading -D
```

## 🦄 Usage

在 vite.config.js / vite.config.ts 添加 spaLoading 插件并配置：

```ts
// vite.config.js / vite.config.ts
import { spaLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [spaLoading()]
}
```

## Overview

### text loading placeholder

```ts
import { spaLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [
    spaLoading('text', {
      tipText: 'The loading text...'
    })
  ]
}
```

### svg loading placeholder

```ts
import { spaLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [
    spaLoading('svg', {
      path: 'xxx/loading.svg'
      // or
      // content: '<svg>....</svg>'
    })
  ]
}
```

### img loading placeholder

```ts
import { spaLoading } from 'vite-plugin-spa-loading'

export default {
  plugins: [
    spaLoading('img', {
      src: 'xxx/loading.gif'
    })
  ]
}
```

## ⚙️ Configuration

```ts
spaLoading(type, { options... })
```

#### type

- Type: `'text' | 'img' | 'svg'`
- Default: `'text'`

加载占位符内容类型。

#### options.rootElementId

- Type: `string`
- Default: `app`

app 挂载元素 ID

#### options.tipText

- Type: `string`
- Default: `loading...`

加载占位符内容提示文字。

#### options.devEnable

- Type: `boolean`
- Default: `true`

开发环境是否启用

#### options.debounce

- Type: `number`
- Default: `150`

防止网络良好的情况下，加载动画一闪而过。

#### options.src

- Type: `string`

当`type`是`img`时，指定图片的地址。推荐使用 base64 图片，避免网络加载影响呈现

#### options.content

- Type: `string`

当 `type`是`svg`时，指定 svg 内容。

#### options.path

- Type: `string`

当 `type`是`svg`时，指定 svg 资源路径。

#### options.css

- Type: `string`

如果已有的样式不合适，可通过此选项自定义 css

## License

[MIT licenses](https://opensource.org/licenses/MIT)
