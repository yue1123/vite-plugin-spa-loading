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

| Property Name | Type     | Description                                                                              | Default Value |
| ------------- | -------- | ---------------------------------------------------------------------------------------- | ------------- |
| rootElementId | string   | The ID of the element where the app will be mounted.                                     | -             |
| devEnable     | boolean  | Whether to enable development environment.                                               | false         |
| css           | string   | Custom CSS styles.                                                                       | -             |
| cssPath       | string   | External CSS file path.                                                                  | -             |
| tipText       | string   | The loading placeholder text.                                                            | "Loading..."  |
| debounce      | number   | Debounce duration to avoid blinking of the loading animation in good network conditions. | -             |
| error.tip     | string   | The error message text.                                                                  | -             |
| error.detail  | boolean  | Whether to show the error details.                                                       | -             |
| error.handler | Function | Error handling function that accepts an array of strings as a parameter.                 | -             |

### Image

`Image` interface extends `BaseOptions` and adds the following properties:

| Property Name | Type   | Description                                      | Default Value |
| ------------- | ------ | ------------------------------------------------ | ------------- |
| src           | string | Path to the image file or base64 encoded string. | -             |

### Svg

`_Svg` interface extends `BaseOptions` and adds the following properties:

| Property Name | Type   | Description         | Default Value |
| ------------- | ------ | ------------------- | ------------- |
| content       | string | SVG content string. | -             |

or

| Property Name | Type   | Description    | Default Value |
| ------------- | ------ | -------------- | ------------- |
| path          | string | SVG file path. | -             |

## License

[MIT licenses](https://opensource.org/licenses/MIT)
