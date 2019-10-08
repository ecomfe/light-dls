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

### `dls-contextual(@color, @type)`

To generate contextual colors according to the given brand color.

**Params**:

- `@color: Color` - the brand color.
- `@type: info | success | warning | error` - the color context.

**Return value**:

`Color` - the generated contextual color.

```less
@color: dls-contextual(#3d88f2, success); // → #39bf45
```

### `dls-shade(@color, @level)`

To generate a specific level of shade of the given base color.

**Params**:

- `@color: Color` - the base color.
- `@level: Number` - the shade level.

**Return value**:

`Color` - the generated shaded color.

```less
@color: dls-shade(#3d88f2, 3); // → #b3cfff
```

### `dls-sum(...@dimensions)`

To get the sum of the given dimensions or `calc` expressions.

**Params**:

- `@dimensions: List<Dimension | Calc>` - A list of length values.

**Return value**:

`Dimension | Calc` - the total value of the given list.

```less
@width: dls-sum(1px, 30%); // → calc(1px + 30%)
@height: dls-sum(1px, 10px, 100px); // → 100px
@top: dls-sum(calc(1px + 5em), -1px); // → 5em
@left: dls-sum(calc(1px + 5em), -1px, calc(-5em)); // → 0
```

### `dls-line-height(@line-height, @font-size): Dimension`

To calculate the absolute `line-height` from the given `line-height` and `font-size` value.

Will return `@line-height` directly if it is an absolute length (eg. `15px`, `2em`). Will return the product of `@line-height` and `@font-size` for relative lengths (eg. `1.5`, `200%`).

**Params**:

- `@line-height: Dimension` - the `line-height` value.
- `@font-size: Dimension` - the `font-size` value.

**Return value**:

The absolute length of the line height.

```less
@h1: dls-line-height(1.5, 16px); // → 24px
@h2: dls-line-height(120%, 15px); // → 18px
@h3: dls-line-height(2em, 1.2em); // → 2em
```

## Options

### `reduceCalc: boolean`

Whether to reduce `calc` expression to the simplest form.

Default value: `true`.

## Tooling

### CLI checker

```sh
npx dls check -c -o result.log
```

#### Commands

##### `check`

To check which variables are not used inside a directory. The current strategy is plain text search so that doesn't cover the case of Less's variable name interpolation.

###### Options

- `--dir` / `-d`

  The target directory to check.

  Default: `.`.

- `--exclude` / `-x`

  Comma-separated glob expression, indicates which files should be ignored.

  Default: `node_modules,test`.

  ```sh
  npx dls check -x node_modules,test,dist # or --exclude=node_modules,test,dist
  ```

- `--components` / `-c`

  Comma-separated component names to specify which component-level variables will be checked. `--components=all` will check all component-level variables.

  Variables can be ignored if you put a `.dlsignore` file under the project root directory, with each variable (should be prefixed by `@`) on a single line. Lines leaded by `#` will be treated as comments.

- `--output` / `-o`

  The output file for the check result.

  ```sh
  npx dls check -o result.log # or --output=result.log
  ```

### Editor Extensions

- **Baidu DLS (VS Code)**

  [Marketplace](https://marketplace.visualstudio.com/items?itemName=justice360.vscode-dls) / [GitHub](https://github.com/Justineo/vscode-dls)

## License

[MIT](https://github.com/ecomfe/less-plugin-dls/blob/master/LICENSE)
