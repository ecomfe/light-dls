# dls-color-palette
To generate a color palette of the given base color.

## Installation
```sh
npm i --save-dev dls-color-palette
```

## Usage

### Get color shade
`function getShade(color: string, level: number): string`

**Params**:
- `color: string` - the brand color in HEX format.
- `level: number` - level of the color shade. Valid range: [1, 10]

**Return Value**:
- color of the given level in HEX.

```javascript
import {getShade} from 'dls-color-palette';
const shade = getShade('#0052cc', 2); // → #e0edff
```

### Get contextual color according to the given brand color
`function getContextual(color: string, type: string): string`

**Params**:
- `color: string` - the brand color in HEX format
- `type: string` - type of the contextual color. It could be one of `info | success | warning | error`

**Return Value**:
- Contextual Color of the type in HEX format

```javascript
import {getContextual} from 'dls-color-palette'
const contextual = getContextual('#0052cc', 'success') // → #00bf5c
```
