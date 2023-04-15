/**
 * 删除一个组件
 * @param {Base} component 要删除的组件
 */
export function delComponent(component) {
  const _father = component.father
  const index = _father.children.indexOf(component)
  _father.children.splice(index, 1)
}
