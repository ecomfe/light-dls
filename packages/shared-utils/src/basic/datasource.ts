import { find as _find, isPlainObject } from 'lodash'

type Nullable<T> = T | null | undefined

type WalkTarget<T> = Nullable<T | Array<T>>

export type WalkInternalContext<T, Ret = any> = {
  depth: number,
  parents: Array<T>,
  parentIndices: Array<number>,
  index?: number,
  childrenResult?: Array<Ret>
  [key: string]: any
}

type Enter<Item> = (item: Item, context: WalkInternalContext<Item>) => boolean | unknown

type Exit<Item, Ret> = (item: Item, context: WalkInternalContext<Item>) => Ret

export type WalkCallback<Item, Ret> = {
  enter?: Enter<Item>,
  exit?: Exit<Item, Ret>
}

export function walk<Item extends NonNullable<any>, ExitRet> (array: WalkTarget<Item>, callback: WalkCallback<Item, ExitRet> | Enter<Item>, alias = 'children', context = {}) {
  return _walk(
    array,
    callback,
    { ...context, depth: 0, parents: [], parentIndices: [] },
    alias
  )
}

function _walk<Item extends NonNullable<any>, ExitRet> (array: WalkTarget<Item>, callback: WalkCallback<Item, ExitRet> | Enter<Item>, context: WalkInternalContext<Item>, alias = 'children') {
  if (!array || !callback) {
    return
  }

  let enter: WalkCallback<Item, ExitRet>['enter']
  let exit: WalkCallback<Item, ExitRet>['exit']
  if (typeof callback === 'function') {
    enter = callback
  } else {
    enter = callback.enter
    exit = callback.exit
  }

  if (!enter && !exit) {
    return
  }

  if (!Array.isArray(array)) {
    array = getChildrenByAlias(array, alias)
    if (!array) {
      return
    }
  }

  let { depth, parents, parentIndices } = context
  let childrenResult: Array<ExitRet> = []
  array.forEach((item, index) => {
    // TODO 防止用户修改depth等
    let selfContext: WalkInternalContext<Item> = { ...context, index }
    let skipChildren = false
    let childrenContext: Record<string, unknown> = {}

    if (typeof enter === 'function') {
      let result = enter(item, selfContext)
      if (result === false) {
        skipChildren = true
      } else if (isPlainObject(result)) {
        // 支持父给子传递上下文
        childrenContext = result as Record<string, unknown>
      }
    }

    let children = getChildrenByAlias(item, alias)
    if (children && !skipChildren) {
      selfContext.childrenResult = _walk(
        children,
        callback,
        {
          ...childrenContext,
          parents: [...parents, item],
          parentIndices: [...parentIndices, index],
          depth: depth + 1
        },
        alias
      )
    }

    if (typeof exit === 'function') {
      childrenResult.push(exit(item, selfContext))
    }
  })
  return childrenResult
}

export function find<T> (array: Nullable<Array<T>>, predicate: (item: T, parents: Array<T>) => boolean, alias = 'children', parents: Array<T> = []) {
  if (!array || typeof predicate !== 'function') {
    return null
  }

  let result: T | null = null
  ;(array as Array<T>).some((item: T) => {
    if (predicate(item, parents)) {
      result = item
      return true
    }
    let children = getChildrenByAlias(item, alias)
    if (!children) {
      return false
    }
    let inner = find(children, predicate, alias, [...parents, item])
    if (inner !== null) {
      result = inner
      return true
    }
  })
  return result
}

export function findParents<T> (
  array: Nullable<Array<T>>,
  predicate: (item: T) => boolean,
  { alias = 'children', includeSelf = false } = {}
) {
  let parents: Array<T> = []
  let self = find(
    array,
    (item, pts) => {
      let match = !!predicate(item)
      if (match) {
        parents = pts
      }
      return match
    },
    alias
  )

  return self == null ? null : includeSelf ? parents.concat(self) : parents
}

function getChildrenByAlias<T extends NonNullable<any>> (obj: T, alias: string | Array<string>) {
  let keys = typeof alias === 'string' ? [alias] : alias

  let key = _find(keys, key => {
    // @ts-ignore
    return Array.isArray(obj[key])
  })
  // @ts-ignore
  return key ? obj[key] as Array<T> : null
}

export function mapDatasource<Item extends NonNullable<any>, Ret> (datasource: WalkTarget<Item>, callback: Exit<Item, Ret>, childrenKey = 'children') {
  return walk(
    datasource,
    {
      exit: (item, context) => {
        return {
          ...callback(item, context),
          ...(hasChildren(item, childrenKey)
            ? { [childrenKey]: context.childrenResult }
            : {})
        }
      }
    },
    childrenKey
  )
}

export function hasChildren (item: NonNullable<any>, childrenKey = 'children') {
  const children = item[childrenKey]
  return !!children && Array.isArray(children) && children.length !== 0
}

export function respectPrevOrder<T> (values: Array<T>, prevValues: Array<T>) {
  const result = prevValues.filter(val => values.includes(val));
  return result.concat(values.filter(val => !result.includes(val)));
}
