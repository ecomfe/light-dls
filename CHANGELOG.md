> ⚠️ - Breaking Changes

## 0.25.0

- ⚠️ Remove `@dls-checkbox-strong-check-icon-spacing`.
- ⚠️ Remove `@dls-checkbox-strong-checked-separator-color` and `@dls-checkbox-strong-checked-separator-color-disabled`. Use `@dls-button-group-separator-color-primary` and `@dls-button-group-separator-color-primary-disabled` instead.
- ⚠️ Remove the redundant `@dls-tooltip-arrow-height` as tooltip arrows are designed as right triangles.
- ⚠️ Remove `@dls-slider-label-spacing` as it should be always consistent with Tooltip's arrow spacing.
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
- ⚠️ Add support for specifying which components will be checked when running `dls check`. `--components` now requires an argument value.

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

- Update global font family. Remove explicit `Helvetica Neue` due to its different line height across different font weights.

## 0.20.0

- ⚠️ Use `@dls-steps-connector-min-length` instead of `@dls-steps-connector-length-vertical`.
- Add default width for Select.
- Add max width for Options.

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
- ⚠️ Use separate global border colors with their own interactive style variants. See [69e4c0e](https://github.com/ecomfe/less-plugin-dls/commit/69e4c0ec6a287bfc1accfa338859c0994ae5da68).
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

- Add check icon variables for strong Checkbox.

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

- Added equal value information in exported meta file.

## 0.1.3

- Fix colors for translucent buttons.
- Add `variables.json` to export meta.

## 0.1.2

- Allow CLI usage with `--dls`.

## 0.1.1

- Fix npm package, place Less files into `tokens` directory.

## 0.1.0

- First release.
