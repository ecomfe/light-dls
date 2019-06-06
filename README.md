# less-plugin-dls

[![](https://badgen.net/circleci/github/ecomfe/less-plugin-dls)](https://circleci.com/gh/ecomfe/less-plugin-dls)

Less plugin for Baidu DLS.

🚧 This is a work in progress. 🚧

## Installation

```sh
npm i --save-dev less-plugin-dls
```

## Usage

### Autoinject with Less plugin

```js
import less from 'less'
import dls from 'less-plugin-dls'

less
  .render('a { color: @dls-link-font-color-normal; }', {
    plugins: [dls()]
  })
  .then(result => {
    // handle result
  })
```

### Import from stylesheets

With [less-loader](https://github.com/webpack-contrib/less-loader):

```less
@import "~less-plugin-dls/tokens/index.less";

a { color: @dls-link-font-color-normal; }
```

### Use CLI argument

```sh
lessc style.less --dls
```

## Tooling

### Editor Extensions

- **Baidu DLS (VS Code)**

  [Marketplace](https://marketplace.visualstudio.com/items?itemName=justice360.vscode-dls) / [GitHub](https://github.com/Justineo/vscode-dls)

## License

[MIT](https://github.com/ecomfe/less-plugin-dls/blob/master/LICENSE)
