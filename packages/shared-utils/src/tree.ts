import { includes, find, filter } from 'lodash'
import { walk, hasChildren, WalkCallback, WalkInternalContext } from './basic/datasource'

type TreeUtilOptions = {
  childrenKey?: string,
  includeIndeterminate?: boolean
}

type MarkedItem = {
  checked: boolean,
  partialChecked: boolean
} & Record<string, unknown>

export function markChecked<Item extends Record<string, unknown>> (treeData: Array<Item>, checked: Array<unknown>, { childrenKey = 'children', includeIndeterminate = false }: TreeUtilOptions = {}) {
  let walker: WalkCallback<Item, void> = {
    enter: (item, context) => {
      return markAncestorInChecked(
        item,
        checked,
        context,
        childrenKey
      )
    },
    exit: (item, context) => {
      let marked = item as MarkedItem
      let { value, [childrenKey]: children } = marked
      if (hasChildren(marked, childrenKey)) {
        marked.checked = (children as Array<MarkedItem>).every(({ checked }) => checked)
        marked.partialChecked =
          !marked.checked &&
          (children as Array<MarkedItem>).some(
            ({ partialChecked, checked }) => !!partialChecked || checked
          )
      } else {
        // 如果中间态不同步进 checked，那么祖先是选中，则下面的所有子孙节点都选中
        marked.checked =
          includes(checked, value) ||
          (!includeIndeterminate && !!context.ancestorInChecked)
      }
    }
  }
  walk(treeData, walker, childrenKey)
  return treeData
}

  // 用原始 tree 和 checked 选中数据派生出选中的子树
export function getCheckedSubTree<Item extends Record<string, unknown>> (tree: Array<Item>, checked: Array<unknown>, { childrenKey = 'children', includeIndeterminate = false }: TreeUtilOptions = {}) {
  const walker: WalkCallback<Item, Item | undefined>  = {
    enter: (item, context) => {
      return markAncestorInChecked(
        item,
        checked,
        context,
        childrenKey
      )
    },
    exit: (item, context) => {
      if (hasChildren(item, childrenKey)) {
        let children = context.childrenResult!.filter(i => !!i)
        if (children.length) {
          return {
            ...item,
            [childrenKey]: children
          }
        }
      } else {
        let isChecked =
          inChecked(checked, item) ||
          (!includeIndeterminate && !!context.ancestorInChecked)
        if (isChecked) {
          return item
        }
      }
    }
  }
  return walk(tree, walker, childrenKey)!.filter(i => !!i)
}

export function toggleChecked() {
  
}


function markAncestorInChecked<T extends Record<string, unknown>> (item: T, checked: Array<unknown>, context: WalkInternalContext<T>, childrenKey = 'children') {
  if (hasChildren(item, childrenKey)) {
    let isChecked = inChecked(checked, item)
    if (isChecked && !context.ancestorInChecked) {
      context.ancestorInChecked = true
    }
    return context
  }
}

function inChecked (checked: Array<unknown>, item: Record<string, unknown>) {
  return item.value != null && includes(checked, item.value)
}
