import { useComponentStore } from '../../../stores/component'

let component

// 安装store
export function register() {
  component = useComponentStore()
}

// 注册组件
export function registerComponent(componentClass) {
  return component.push(componentClass)
}

// 注册选择事件
export function selectComponent(id) {
  component.select = id
}
