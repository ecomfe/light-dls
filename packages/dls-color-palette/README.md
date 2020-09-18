# dls-color-palette

To generate a color palette out of the given base color.

## Installation

```sh
npm i --save-dev dls-color-palette
```

## Usage

### Get color shade

`function getShade(color: string, level: number): string`

**Params**:

- `color: string` - the brand color in hex format.
- `level: number` - level of the color shade. Valid range: [1, 10]

**Return Value**:

- Color of the given level in hex format.

```js
import { getShade } from 'dls-color-palette'
const shade = getShade('#0052cc', 2) // → #e0edff
```

### Get contextual color according to the given brand color

`function getContextual(color: string, type: string): string`

**Params**:

- `color: string` - the brand color in hex format.
- `type: 'info' | 'success' | 'warning' | 'error'` - type of the contextual color.

**Return Value**:

- Contextual color in hex format.

```js
import { getContextual } from 'dls-color-palette'
const contextual = getContextual('#0052cc', 'success') // → #00bf5c
```
