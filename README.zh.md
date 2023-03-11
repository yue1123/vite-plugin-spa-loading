# vite-plugin-app-loading

![npm](https://img.shields.io/npm/v/vite-plugin-app-loading?style=flat-square)
![npm](https://img.shields.io/npm/dm/vite-plugin-app-loading?style=flat-square)
![GitHub](https://img.shields.io/github/license/yue1123/vite-plugin-app-loading?style=flat-square)


[English](./README.md)


单页面应用程序首屏加载占位符插件，开箱即用。

## 📦 Install

```shell
npm i vite-plugin-app-loading -D

# yarn
yarn add vite-plugin-app-loading -D

# pnpm
pnpm add vite-plugin-app-loading -D
```

## 🦄 Usage

在 vite.config.js / vite.config.ts 添加 viteAppLoading 插件并配置：

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

加载占位符内容类型。

#### loadingText

- Type: `string`

加载占位符内容提示文字。

#### devEnable

- Type: `boolean`
- Default: `false`

开发环境是否启用

#### debounce

- Type: `number`
- Default: `300`

防止网络良好的情况下，加载动画一闪而过。

#### src

- Type: `string`

当`type`是`img`时，指定图片的地址。推荐使用 base64 图片，避免网络加载影响呈现

#### svgContent

- Type: `string`

当 `type`是`svg`时，指定 svg 内容。

#### svgPath

- Type: `string`

当 `type`是`svg`时，指定 svg 资源路径。

#### css

- Type: `string`

如果已有的样式不合适，可通过此选项自定义 css

## License

[MIT licenses](https://opensource.org/licenses/MIT)
