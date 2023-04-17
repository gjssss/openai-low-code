import { useComponentStore } from '@/stores/component'
import * as classes from '@/lib'

let component

// 安装store
export function saveRegister() {
  component = useComponentStore()
}

export function savePage() {
  const page = JSON.stringify(component.root.jsonify().children)
  // console.log(page)
  localStorage.setItem('page-1', page)
  window.$message.success('保存成功')
}

export function loadPage() {
  let page = localStorage.getItem('page-1')
  try {
    page = JSON.parse(page)
  } catch (error) {
    window.$message.error(error.toString())
    return
  }
  if (page) {
    component.root.children.splice(0)
    parsePage(component.root, page)
    window.$message.success('加载成功')
  } else {
    window.$message.warning('还没有保存页面哦')
  }
}

function parsePage(root, children) {
  children.forEach((child) => {
    // 获取type
    const type = child.__type__
    delete child.__type__

    // 获取setting
    const settings = child.settings
    delete child.settings

    // 设置为无默认样式
    child.plant = true
    let instance
    // 如果有children，则是容器类型
    if (Object.hasOwnProperty.call(child, 'children')) {
      // 暂存child
      const children = child.children
      delete child.children
      // 实例化容器组件
      instance = Reflect.construct(classes[type], [child])
      // 递归的将子组件解析到容器组件中
      parsePage(instance, children)
    } else {
      instance = Reflect.construct(classes[type], [child])
    }
    for (let i in settings) {
      instance.settings[i] = settings[i]
    }
    instance.father = root
    root.children.push(instance)
  })
}
