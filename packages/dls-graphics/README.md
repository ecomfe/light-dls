# dls-graphics

Shared graphic resources for Baidu Light DLS.

## Installation

```sh
npm i --save-dev dls-graphics
```

## Usage

### JavaScript

```js
import { loading } from 'dls-graphics'

console.log(loading)
/*
{
  contents: '<g style="transform-origin:50% 50%;animation:spin-359eb...',
  attrs: {
    width: '40',
    height: '40',
    class: 'dls-loading',
    viewBox: '0 0 64 64'
  }
}
*/
```

For example, to use it in a React component:

```js
import { loading } from 'dls-graphics'

export function IconLoading() {
  return (
    <svg
      {...loading.attrs}
      dangerouslySetInnerHTML={{ __html: loading.contents }}
    />
  )
}
```

#### Separate

To get `<style>` contents extracted outside SVG data, you can use:

```js
import { loading, loadingCss } from 'dls-graphics/dist/separate'

console.log(loading)
console.log(loadingCss)
/*
{
  contents: '<g style="transform-origin:50% 50%;animation:spin-359eb...',
  attrs: {
    width: '40',
    height: '40',
    class: 'dls-loading',
    viewBox: '0 0 64 64'
  }
}

@keyframes spin-359eb{0%{transform:rotate(0deg)}to{transform...
*/
```

### SVG assets

All graphics are also distributed as SVG files. You can acquire these minified SVG source to use properly. eg. import and render into your HTML file with webpack's `HtmlWebpackPlugin`, or use with some custom SVG loader to convert them directly into components.

#### Standalone

Standalone SVGs resides at `dls-graphics/dist`.

#### Separate

If you want to use SVGs with `<style>` contents extracted into separate CSS files, you can look into `dls-graphics/dist/separate`.

### List of available graphs

<!-- assets-begin -->
* **`imagePlaceholder`** (image-placeholder.svg)

  ![imagePlaceholder](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/image-placeholder.svg)

* **`partialBlankBrush`** (partial-blank-brush.svg)

  ![partialBlankBrush](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/partial-blank-brush.svg)

* **`blank`** (blank.svg)

  ![blank](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/blank.svg)

* **`partialBlank`** (partial-blank.svg)

  ![partialBlank](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/partial-blank.svg)

* **`partialForbidden`** (partial-forbidden.svg)

  ![partialForbidden](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/partial-forbidden.svg)

* **`forbidden`** (forbidden.svg)

  ![forbidden](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/forbidden.svg)

* **`partialError`** (partial-error.svg)

  ![partialError](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/partial-error.svg)

* **`notFound`** (not-found.svg)

  ![notFound](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/not-found.svg)

* **`serverError`** (server-error.svg)

  ![serverError](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/server-error.svg)

* **`loading`** (loading.svg)

  ![loading](https://raw.githubusercontent.com/ecomfe/light-dls/master/packages/dls-graphics/src/loading.svg)

<!-- assets-end -->
