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

## Custom functions

### `contextual(@color, @type)`

To generate contextual colors according to the given brand color.

**Params**:

- `@color: Color` - the brand color.
- `@type: info | success | warning | error` - the color context.

**Return value**:

`Color` - the generated contextual color.

```less
@color: contextual(#3d88f2, success); // → #39bf45
```

### `shade(@color, @level)`

To generate a specific level of shade of the given base color.

**Params**:

- `@color: Color` - the base color.
- `@level: Number` - the shade level.

**Return value**:

`Color` - the generated shaded color.

```less
@color: shade(#3d88f2, 3); // → #b3cfff
```

### `sum(...@dimensions)`

To get the sum of the given dimensions or `calc` expressions.

**Params**:

- `@dimensions: List<Dimension | Calc>` - A list of length values.

**Return value**:

`Dimension | Calc` - the total value of the given list.

```less
@width: sum(1px, 30%); // → calc(1px + 30%)
@height: sum(1px, 10px, 100px); // → 100px
@top: sum(calc(1px + 5em), -1px); // → 5em
@left: sum(calc(1px + 5em), -1px, calc(-5em)); // → 0
```

### `line-height(@line-height, @font-size): Dimension`

To calculate the absolute `line-height` from the given `line-height` and `font-size` value.

Will return `@line-height` directly if it is an absolute length (eg. `15px`, `2em`). Will return the product of `@line-height` and `@font-size` for relative lengths (eg. `1.5`, `200%`).

**Params**:

- `@line-height: Dimension` - the `line-height` value.
- `@font-size: Dimension` - the `font-size` value.

**Return value**:

The absolute length of the line height.

```less
@h1: line-height(1.5, 16px); // → 24px
@h2: line-height(120%, 15px); // → 18px
@h3: line-height(2em, 1.2em); // → 2em
```

## Options

### `reduceCalc: boolean`

Whether to reduce `calc` expression to the simplest form.

Default value: `true`.

## Tooling

### Editor Extensions

- **Baidu DLS (VS Code)**

  [Marketplace](https://marketplace.visualstudio.com/items?itemName=justice360.vscode-dls) / [GitHub](https://github.com/Justineo/vscode-dls)

## License

[MIT](https://github.com/ecomfe/less-plugin-dls/blob/master/LICENSE)
