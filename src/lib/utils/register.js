import { useComponentStore } from '@/stores/component'

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

export const defaultStyles = {
  padding: '0px',
  margin: '0px',
  color: 'transparent',
  'font-size': '16px',
  'border-width': '0px',
  'border-style': 'solid',
  'border-color': 'black',
  'border-top-left-radius': '0px',
  'border-top-right-radius': '0px',
  'border-bottom-left-radius': '0px',
  'border-bottom-right-radius': '0px',
}
