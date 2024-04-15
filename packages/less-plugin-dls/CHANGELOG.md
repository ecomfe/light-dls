> ⚠️ - Breaking Changes

## 11.11.0

- Adjust global translucent color tokens.

## 11.10.0

- Add theme tokens.
- Add more metadata output options.

## 11.9.0

- Update neutral color #9.
- Update default tag background opacity.

## 11.8.4

- Adjust tokens for default tag.
- Deprecate `@dls-tag-color` and `@dls-tag-color-selected`.

## 11.8.3

- Adjust border opacity for tags.

## 11.8.2

- Fix pagination font color.

## 11.8.1

- ⚠️ Removed unnecessary tokens for pagination.
- Add font color token for pagination's current page.

## 11.8.0

- Add tokens for pagination's current page.

## 11.7.1

- Fix rating selected symbol color token.
- Add rating font size.

## 11.7.0

- Add tokens for rating.

## 11.6.6

- Fix translucent color.

## 11.6.5

- Add default height for vertical sliders.

## 11.6.4

- Update toast list top spacing.

## 11.6.3

- Fix scrollbar thumb border radius.

## 11.6.2

- Make nav tokens compatible with Less 4.

## 11.6.1

- Make scrollbar tokens compatible with Less 4.

## 11.6.0

- Upgrade to D22 tokens.
- Add tokens for scrollbar.

## 11.5.1

- Adjust tag remove icon size.

## 11.5.0

- Add tokens for tag input.
- Refine tokens for multi-select.
- Add subtle neutral foreground colors and subtle text buttons.
- Add spacing tokens.

## 11.4.0

- Add tokens for reverse translucent layers.
- Add tokens for ghost buttons.

## 11.3.0

- Update tokens for steps.

## 11.3.0-beta.1

- Update color palette.

## 11.2.1

- Update colors for stateless dot steps.

## 11.2.0

- Add tokens for stateless steps.

## 11.1.0

- Add step marker sizes for dot style.

## 11.0.0

- ⚠️ Upgrade tokens for steps.

  - `@dls-steps-{title,desc}-max-width-horizontal` → `@dls-steps-{title,desc}-max-width`
  - `@dls-steps-marker-shadow-{completed,error,current,error-current}-focus` → `@dls-steps-marker-shadow{,-error}-focus`
  - `@dls-steps-marker-border-color-{current,error-current}-focus` → `@dls-steps-marker-border-color{,-error}-focus`

- Add `@dls-steps-marker-background-color-incomplete-{hover,focus,active}`.
- Add `@dls-steps-marker-background-color-dot-{incomplete,complete,error,current,error-current}{,-hover,-focus,-active}`.
- Add `@dls-steps-marker-border-color-dot-{incomplete,complete,error,current,error-current}`.

## 10.0.0

- ⚠️ Upgrade tokens for progress circle sizes.

  - `@dls-progress-size-circular` → `@dls-progress-size-circular-{m,s,xs}`
  - `@dls-progress-icon-size-circular` → `@dls-progress-icon-size-circular-{m,s,xs}`

- Add `*-xs` tokens for progress component.

## 9.2.0

- Add `@dls-font-size-6` and adjust other font-sizes.
- Adjust line-heights for alert, popover, tooltip and collapse.

## 9.1.1

- Add `@dls-empty-{title,desc}-font-weight`.

## 9.1.0

- Add tokens for empty state component.

## 9.0.1

- Fix `@dls-sidenav-item-font-color-hover`.

## 9.0.0

- ⚠️ Upgrade tokens for uploader media spacing.

  - `@dls-uploader-media-spacing-x` → `@dls-uploader-media-spacing-x-{m,s}`
  - `@dls-uploader-media-spacing-y` → `@dls-uploader-media-spacing-y-{m,s}`

- Add `@dls-uploader-media-label-color`.

## 8.0.1

- Update field icon color.
- Update radio/checkbox group spacing.

## 8.0.0

- ⚠️ Upgrade tokens for uploader.

  - `@dls-uploader-helper-text-spacing-{file,media}` → `@dls-uploader-helper-text-spacing-{x,y}`
  - `@dls-uploader-helper-text-max-width-media` → `@dls-uploader-helper-text-max-width-media-{s,m}`
  - `@dls-uploader-file-item-label-spacing-before` → `@dls-uploader-file-item-label-spacing`
  - `@dls-uploader-file-item-label-spacing-after` → `@dls-uploader-file-item-action-spacing`
  - `@dls-uploader-media-error-spacing` → `@dls-uploader-error-spacing`
  - Remove `@dls-uploader-file-item-height`
  - Add `dls-uploader-file-item-background-color-error` & `@dls-uploader-file-item-background-color-error-hover`

## 7.1.2

- Extract token type by name first, improve the exported metadata.

## 7.1.1

- Refine export metadata for `calc()` and `var()` values.

## 7.1.0

- Adjust form spacing tokens.
- Add `@dls-form-field-help-spacing`.

## 7.0.0

- ⚠️ Remove `@dls-loading-padding`.
- ⚠️ Replace `@dls-loading-content-spacing` with size-specific tokens.
- Add tokens for message.

## 6.0.1

- Improve token references for button heights, and tag heights in select.

## 6.0.0

- ⚠️ Update tab tokens for the new design. See [ecomfe/light-dls/#90](https://github.com/ecomfe/light-dls/pull/90) for details.
- ⚠️ Add tokens for nav and sidenav, deprecate menu tokens.
- Remove link underline by default.
- Add tokens for min/max width for tabs items.
- Adjust size for tab close icons.

## 5.2.0

- Add transition tokens.

## 5.1.0

- Add more tokens for layout.

## 5.0.0

- ⚠️ Remove dropdown menu related tokens from option, rename and put them in to dropdown.

  - `@dls-option-dropdown-max-height-xs` → `@dls-dropdown-menu-max-height-xs`
  - `@dls-option-dropdown-max-height-s` → `@dls-dropdown-menu-max-height-s`
  - `@dls-option-dropdown-max-height-m` → `@dls-dropdown-menu-max-height-m`
  - `@dls-option-dropdown-max-height-l` → `@dls-dropdown-menu-max-height-l`
  - `@dls-option-dropdown-border-radius-xs` → `@dls-dropdown-menu-border-radius-xs`
  - `@dls-option-dropdown-border-radius-s` → `@dls-dropdown-menu-border-radius-s`
  - `@dls-option-dropdown-border-radius-m` → `@dls-dropdown-menu-border-radius-m`
  - `@dls-option-dropdown-border-radius-l` → `@dls-dropdown-menu-border-radius-l`
  - `@dls-option-dropdown-target-spacing` → `@dls-dropdown-menu-target-spacing`
  - `@dls-option-dropdown-shadow` → `@dls-dropdown-menu-shadow`
  - `@dls-option-dropdown-placeholder-padding-y` → `@dls-dropdown-menu-placeholder-padding-y`
  - `@dls-option-dropdown-placeholder-font-color` → `@dls-dropdown-menu-placeholder-font-color`

- Add tokens for layout.

## 4.0.0

- ⚠️ Remove `@dls-pagination-page-items-margin-before`, `dls-pagination-page-items-margin-after`, `@dls-pagination-spacing-1` and `@dls-pagination-spacing-2`.
- Add `@dls-pagination-part-spacing` and `@dls-pagination-content-spacing`.

## 3.0.0

- ⚠️ Remove `@dls-popover-action-font-size-s` and `@dls-popover-action-font-size-m`.
- Add `@dls-popover-title-font-weight`.

## 2.1.0

- Add title/action font tokens for Popover.
- Fix the missing accordion tokens.

## 2.0.0

- ⚠️ Remove `@dls-collapse-border-color-focus` and `@dls-collapse-header-background-color-focus`.
- Add more tokens for ui variants for Collapse.
- Add spacing tokens for Popover's title and action.
- Add gutter token for Accordion.

## 1.5.0

- ⚠️ Renamed line spacing variables for radio/checkbox groups:

  - `@dls-radio-group-line-spacing-strong` → `@dls-radio-group-line-spacing`
  - `@dls-checkbox-group-line-spacing-strong` → `@dls-checkbox-group-line-spacing`

## 1.4.0

- ⚠️ Move simple radio/checkbox group related stuff out of button:

  - `@dls-button-line-spacing-strong` → `@dls-radio-group-line-spacing-strong`/`@dls-checkbox-group-line-spacing-strong`
  - `@dls-button-spacing-simple` → `@dls-radio-group-spacing-simple`/`@dls-checkbox-group-spacing-simple`

## 1.3.0

- ⚠️ Move most strong checkbox tokens to button as `@dls-button-*-selected`.
- Add disabled radio font color.
- Add strong checkbox icon colors.

## 1.2.0

- ⚠️ Remove unused shadow variables.
- Add light shadows.
- Add highlightable neutral forground colors.

## 1.1.0

- Add more variables to simple checkbox button groups.

## 1.0.1

- Add more indicator colors for Carousel.

## 1.0.0

- Add more carousel variables.
- Replace `@dls-carousel-control-spacing` with `@dls-carousel-control-spacing-inside` and `@dls-carousel-control-spacing-outside`.
- Darken border color for disabled layers.
- Add disabled font color for checkboxes.

## 1.0.0-beta.2

- Add Cascader variables.
- Fix spacing for DatePicker.

## 1.0.0-beta.1

- Roll back interpolation check for `dls check` as it's non-trivial to make compilation always work and also very time consuming.
- Add compatibility support for Less 4.

## 1.0.0-beta.0

- Add interpolation check for `dls check` command.
- Reduce auto injection created by the injected code itself.

## 1.0.0-alpha.36

- ⚠️ Remove `@dls-table-cell-padding-x-extra`.
- Add tokens for Table filter action spacing.

## 1.0.0-alpha.35

- Add table cell extra padding for hidden filters.

## 1.0.0-alpha.34

- Update global icon sizes.

## 1.0.0-alpha.33

- Update icon sizes in Uploader and Lightbox.

## 1.0.0-alpha.32

- ⚠️ Rename `image` to `media` for Uploader.
- ⚠️ Split size tokens into sizes `s` and `m` for Uploader.
- Add tokens for Lightbox.

## 1.0.0-alpha.31

- Update font size of Dialog title.

## 1.0.0-alpha.30

- Fix shade accurarcy loss by update dep to `dls-color-palette@0.0.1-alpha.3`.

## 1.0.0-alpha.29

- Update to latest version of `dls-color-palette`.

## 1.0.0-alpha.28

- Refactor: use `dls-color-palette` dep in `dls-shade` and `dls-contextual` plugins.
- Refactor: use `color-converters` instead of `kolor`.
- Fix: rollup plugin deprecated warnings by changing rollup plugins to `@rollup/*` and upgrade `rollup`.

## 1.0.0-alpha.27

- Fix dependencies for check command.

## 1.0.0-alpha.26

- Add memoize for plugins.
- Add `inject` option so that variable injection can be optional.
- Add `@dls-foreground-color-neutral-dim-*`.
- Add `@dls-color-*-0` and `@dls-color-*-11` for contextual colors.
- Add table header icon colors.

## 1.0.0-alpha.25

- Add `@dls-menu-border-color-horizontal`.

## 1.0.0-alpha.24

- Add `variables.js` to provide variable values to JavaScript.

## 1.0.0-alpha.23

- Add `@dls-tab-spacing-x-strong-m` and `@dls-tab-menu-padding-x-strong-m`.
- Fix border radii for strong Tabs.
- Fix font weight for current Menu item.

## 1.0.0-alpha.22

- ⚠️ Remove `@dls-button-border-color-*-focus`, use the existing `@dls-button-border-color-focus` instead.

## 1.0.0-alpha.21

- Fix Checkbox icon size.
- Fix NumberInput icon size.
- Fix Progress track width.

## 1.0.0-alpha.20

- Fix header padding for Collapse.
- Add `@dls-dialog-title-font-weight`.
- Fix font weight for selected options and their parents.
- Add hover/focus/active border colors for Button.

## 1.0.0-alpha.19

- Fix icon size for Loading.

## 1.0.0-alpha.18

- Update border colors for Alert.

## 1.0.0-alpha.17

- Update color palette algorithm.
- Fix font size for Progress.
- Fix font weight for selected Tree node.

## 1.0.0-alpha.16

- Add hover/focus/active value for DatePicker's selected year list item.
- Fix base brand color (not directly used).

## 1.0.0-alpha.15

- Fix `@dls-background-color-pressable-disabled`.

## 1.0.0-alpha.14

- Fix disabled foreground colors for primary contextual colors.

## 1.0.0-alpha.13

- Fix default color for Pagination items.
- Fix `@dls-foreground-color-neutral-weak-disabled`.

## 1.0.0-alpha.12

- Fix current item color for Breadcrumb.

## 1.0.0-alpha.11

- Update table cell border color.

## 1.0.0-alpha.10

- ⚠️ Rename `reversed` to `reverse` in Tag.
- Add `@dls-tag-font-color-selected`.

## 1.0.0-alpha.9

- ⚠️ Refactor how Tag colors work. Merged background and foreground colors into colors (except for font color of reversed tags).
- Add `@dls-form-actions-content-spacing`.

## 1.0.0-alpha.8

- Fix font color for current horizontal menu item.

## 1.0.0-alpha.7

- Add `dls-even` function.

## 1.0.0-alpha.6

- Fix focus and active background color for horizontal Menu.
- Use hard-coded triple shadow for now.
- Fix Switch sizes.
- Fix dot size for Radio.

## 1.0.0-alpha.5

- Fix dot size for Radio.
- Add font color for Pagination items.
- Add styles for strong Checkbox.

## 1.0.0-alpha.4

- ⚠️ Remove segment Tabs.
- Add spacing for add buttons in Tabs.
- Add simple Tabs and strong Tabs.
- ⚠️ Rename `@dls-date-picker-cell-border-focus-color` to `@dls-date-picker-cell-border-color-focus` to comply with naming convention.
- Fix background for aux cells in DatePicker.
- Add icon size and spacing for strong Checkbox.

## 1.0.0-alpha.3

- ⚠️ Use opacity for Tag.
- Add `@dls-line-color-0`.

## 1.0.0-alpha.2

- Continue to update more component tokens (WIP).

## 1.0.0-alpha.1

- Continue to update more component tokens (WIP).

## 1.0.0-alpha.0

- Move most tokens to D20 (WIP).

## 0.33.4

- Add `@dls-tooltip-border-radius`.

## 0.33.3

- Add `@dls-menu-item-content-spacing`.
- Add `@dls-table-body-height-no-data`.
- Add `@dls-table-action-spacing`.

## 0.33.2

- Add `@dls-toast-list-spacing-before`.

## 0.33.1

- Add `@dls-textarea-count-border-radius`.

## 0.33.0

- ⚠️ Rename `@dls-tree-node-*-current-*` to `@dls-tree-node-*-selected-*` for correct semantics.
- ⚠️ Remove `@dls-uploader-image-padding-top` because contents are now centered vertically.
- ⚠️ Replace `@dls-uploader-image-progress-spacing-before` with `@dls-uploader-image-content-spacing`.
- Add `@dls-tree-node-background-color-selected-*`.

## 0.32.0

- ⚠️ Remove `@dls-shadow-offset-x-overflow` and `@dls-shadow-offset-y-overflow` and provide a single `@dls-shadow-offset-overflow`.
- Add overflow shadows for Table.
- Add Toast spacing.
- Add default width for DatePicker.

## 0.31.0

- ⚠️ Remove `@dls-uploader-helper-text-spacing-y` as helper text is now always on the right.
- ⚠️ Split `@dls-uploader-helper-text-spacing-x` into `@dls-uploader-helper-text-spacing-file` and `@dls-uploader-helper-text-spacing-image`.
- Add `@dls-uploader-helper-text-max-width-image`.
- Adjust vertical spacing of multi-line image uploader.

## 0.30.0

- Add Table variables.

## 0.29.0

- Add global overflow shadows.
- Add overflow shadows and panel paddings for Tabs.

## 0.28.0

- ⚠️ Rename `@dls-date-picker-year-scroller-*` to `@dls-date-picker-list-*` as they apply to both shortcut list and year scroller now.
- Add `@dls-date-picker-list-background-color-selected`.

## 0.27.0

- ⚠️ Remove `@dls-uploader-file-progress-width` and `@dls-uploader-file-item-close-icon-spacing`. Use `@dls-uploader-file-item-width` with `@dls-uploader-file-item-padding-x` instead.
- Add `@dls-uploader-file-item-padding-x`.
- Add `@dls-date-picker-icon-color` & `@dls-date-picker-icon-color-disabled`.
- Add segment style variables for Tabs.

## 0.26.8

- Fix error font color for Input.

## 0.26.7

- Fix Dropdown button padding.
- Add Uploader mask opacity.

## 0.26.6

- Adjust default width of NumberInput.
- Add global overflow shadow.

## 0.26.5

- Adjust the max-width of Tooltip.

## 0.26.4

- Add missing variables for Uploader.

## 0.26.3

- Fix box shadow color for inline Input.

## 0.26.2

- Update checkmark color for strong CheckboxGroup.
- Add inline style variables for Input.

## 0.26.1

- ⚠️ Remove `@dls-dialog-body-line-height-contextual`.
- Fix value for `@dls-dialog-body-line-height`.

## 0.26.0

- Add DatePicker.

## 0.25.0

- ⚠️ Remove `@dls-checkbox-strong-check-icon-spacing`.
- ⚠️ Remove `@dls-checkbox-strong-checked-separator-color` and `@dls-checkbox-strong-checked-separator-color-disabled`. Use `@dls-button-group-separator-color-primary` and `@dls-button-group-separator-color-primary-disabled` instead.
- ⚠️ Remove the redundant `@dls-tooltip-arrow-height` as tooltip arrows are designed to be right triangles.
- ⚠️ Remove `@dls-slider-label-spacing` as it should always be consistent with Tooltip's arrow spacing.
- Fix value of `@dls-progress-icon-spacing-bar`.
- Add `@dls-time-picker-icon-color-disabled`.

## 0.24.2

- Fix `.dlsignore` comments.
- Fix `dls check` without `--components` argument.

## 0.24.1

- Add `@dls-carousel-pages-border-radius` for Carousel.

## 0.24.0

- Add `@dls-time-picker-icon-color` for TimePicker.
- Update indicator size for Carousel.
- ⚠️ Add support for specifying which components will be checked against when running `dls check`. `--components` now requires an argument value.

## 0.23.3

- ⚠️ Revert 0.23.2: remove Tag font sizes in Select.
- Add Option dropdown placeholder variables.

## 0.23.2

- Add Tag font sizes in Select.

## 0.23.1

- Revert optimization due to unexpected failure in certain cases.

## 0.23.0

- ⚠️ Rename `@dls-tag-icon-size` to `@dls-tag-icon-size-aux`.
- Add icon variables for Input.

## 0.22.0

- Conditionally inject tokens only if a file matches the

## 0.21.1

- Fix `esm` dependency.

## 0.21.0

- Add CLI command to check implementation quality.

## 0.20.3

- Add variables for option dropdown border radii.

## 0.20.2

- Add `@dls-dropdown-icon-size-aux`.

## 0.20.1

- Update the global font family. Remove explicit `Helvetica Neue` due to its different line-height across different font weights.

## 0.20.0

- ⚠️ Use `@dls-steps-connector-min-length` instead of `@dls-steps-connector-length-vertical`.
- Add default width for Select.
- Add max-width for Options.

## 0.19.0

- Add necessary variables for Dialog.

## 0.18.0

- Add `@dls-icon-color-aux` and `@dls-icon-color-aux-disabled`.
- Add aux icon colors for Select and Tree.

## 0.17.1

- ⚠️ Fix `@dls-dialog-close-icon-fullscreen` to `@dls-dialog-close-icon-size-fullscreen`.

## 0.17.0

- ⚠️ Rename `panel` inside Collapse to `body` (align with Bootstrap naming).
- ⚠️ Adjust variant styles for Tag.
- Add contextual variants for Dialogs.
- Add background and backdrop colors for Dialog.
- Add border color and shadow for Embedded.
- Add border radii for Popover.
- Add panel width and item content spacing for Transfer.

## 0.16.3

- ⚠️ Merge Collapse border colors into `@dls-collapse-border-color` and `@dls-collapse-border-color-focus`.

## 0.16.2

- Add missing disabled colors and border radii for Collapse.
- Add default connector length for vertical Steps.
- Add option dropdown target spacing for Option.

## 0.16.1

- Update Link hover color.

## 0.16.0

- ⚠️ Rename Breadcrumbs to Breadcrumb.

## 0.15.2

- Fix min-height variables for Textarea.

## 0.15.1

- Add spacing variables for Checkbox/Radio groups.

## 0.15.0

- Add Dialog.
- Add Drawer.
- Add Embedded.
- Add Toast.
- Add Alert.
- Add Carousel.
- Add min-height and panel spacing for Transfer.

## 0.14.3

- Add `@dls-font-color-highlighted`, and make all search highlighted colors refer to it.
- Add `@dls-tree-node-font-color-highlighted`.

## 0.14.2

- Add goto input variables for Pagination.

## 0.14.1

- Fix missing variables for Pagination.

## 0.14.0

- ⚠️ Rename `TextInput` to `Input`.
- ⚠️ Remove interactive variants for option toggle icons.
- ⚠️ Remove `@dls-progress-icon-color`.
- ⚠️ Use separate global border colors with their interactive style variants. See [69e4c0e](https://github.com/ecomfe/less-plugin-dls/commit/69e4c0ec6a287bfc1accfa338859c0994ae5da68).
- Add Dropdown.
- Add SearchBox.
- Add Slider.
- Add Collapse.
- Add Tooltip.
- Add Popover.
- Add button group separator colors.

## 0.13.0

- ⚠️ Rename `@dls-breadcrumbs-icon-size` to `@dls-breadcrumbs-separator-icon-size`.
- ⚠️ Merge `@dls-checkbox-icon-size-s` and `@dls-checkbox-icon-size-m` into `@dls-checkbox-icon-size`.
- ⚠️ Merge `@dls-steps-marker-icon-size-s` and `@dls-steps-marker-icon-size-m` into `@dls-steps-marker-icon-size`.
- Add max heights for option group dropdowns.
- Add Progress.
- Add Tree.
- Add Transfer.
- Add Tabs.
- Add Menu.
- Add Select.
- Adjust aux icon sizes.

## 0.12.0

- Add Loading.

## 0.11.0

- Add Tag.
- Add Anchor.

## 0.10.0

- ⚠️ Rename focus shadow related variables according to DLS's naming convention. See [5080fb1](https://github.com/ecomfe/less-plugin-dls/commit/5080fb1077c4c18a4a5571644fa97bd0c34438f6) for details.
- Add Pagination.
- Add Badge.
- Add Breadcrumbs.
- Add Steps.
- Add info color generation rules.

## 0.9.3

- Differentiate default digits for normal/strong number inputs.

## 0.9.2

- Add `@dls-checkbox-strong-checked-separator-color-disabled`.

## 0.9.1

- Add check icon variables for strong Checkboxes.

## 0.9.0

- Add TimePicker.
- Add `@dls-text-input-content-spacing`.
- Tweak `@dls-button-font-color-translucent-disabled`.

## 0.8.0

- ⚠️ Rename `@dls-switch-focus-shadow-on` and `@dls-switch-focus-shadow-off` to `@dls-switch-shadow-on-focus` and `@dls-switch-shadow-off-focus` respectively, adhering to DLS's naming convention.
- Add Option.

## 0.7.0

- ⚠️ Rename `docked` to `anchored` for global box-shadows.
- Add focus related variables to Switch.

## 0.6.0

- ⚠️ Dropped variables related to `font-weight` for Button and Link.

## 0.5.3

- Add icon size for Checkbox.

## 0.5.2

- Fix font color for disabled translucent Button.

## 0.5.1

- Add focus background colors for Button.
- Fix background color for disabled translucent Button.

## 0.5.0

- Add Textarea.
- Add `dls-line-height` function.
- Add `reduceCalc` option.

## 0.4.0

- Add TextInput.
- Add NumberInput.
- Add `dls-sum` function.

## 0.3.0

- Add Checkbox.

## 0.2.0

- ⚠️ Dropped `@dls-button-font-color-link` and `@dls-button-font-color-link-disabled`.
- Add Switch.
- Add Radio.
- Add focus related variables to existing components.

## 0.1.4

- Added equal value information in the exported metafile.

## 0.1.3

- Fix colors for translucent buttons.
- Add `variables.json` to export meta.

## 0.1.2

- Allow CLI usage with `--dls`.

## 0.1.1

- Fix npm package, place Less files into `tokens` directory.

## 0.1.0

- First release.
