import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols"
import {
  Key,
  Props,
  ReactElementType,
  Ref,
  Type,
  ElementType,
} from "shared/ReactTypes"

export const createElement = (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType => {
  const element: ReactElementType = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: "KaSong",
  }

  return element
}

// jsx 默认接收两个参数，如果有第三个参数，统一当做 children 对待
export const jsx = (
  type: ElementType,
  config: any,
  ...mapChildren
): ReactElementType => {
  let key: Key = null
  let ref: Ref = null
  const props: Props = {}

  for (const prop in config) {
    if ({}.hasOwnProperty.call(config, prop)) {
      const value = config[prop]

      // 特殊处理一下 key 和 ref
      if (prop === "key") {
        if (value !== undefined) {
          key = value + ""
        }
        continue
      }

      if (prop === "ref") {
        if (value !== undefined) {
          ref = value
        }

        continue
      }

      props[prop] = value
    }
  }

  const mapChildrenLength = mapChildren.length
  if (mapChildrenLength === 1) {
    props.children = mapChildren[0]
  } else {
    props.children = mapChildren
  }

  return createElement(type, key, ref, props)
}

// 实际上 react 源码中 jsxDEV 和 jsx 是两个不同的实现，jsxDEV 能够做一些开发环境的额外的检查，这里我们简单认为他俩在我们的项目中是相同的
export const jsxDEV = (type: ElementType, config: any): ReactElementType => {
  let key: Key = null
  let ref: Ref = null
  const props: Props = {}

  for (const prop in config) {
    if ({}.hasOwnProperty.call(config, prop)) {
      const value = config[prop]

      // 特殊处理一下 key 和 ref
      if (prop === "key") {
        if (value !== undefined) {
          key = value + ""
        }
        continue
      }

      if (prop === "ref") {
        if (value !== undefined) {
          ref = value
        }

        continue
      }

      props[prop] = value
    }
  }

  return createElement(type, key, ref, props)
}
