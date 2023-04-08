import { useComponentStore } from '@/stores/component'
import * as classes from '@/lib'

let component

// 安装store
export function saveRegister() {
  component = useComponentStore()
}

export function savePage() {
  const page = JSON.stringify(component.root.jsonify().children)
  localStorage.setItem('page-1', page)
  window.$message.success('保存成功')
}

export function loadPage() {
  let page = localStorage.getItem('page-1')
  console.log(page)
  try {
    page = JSON.parse(page)
  } catch (error) {
    window.$message.error(error.toString())
    return
  }
  if (page) {
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

    child.plant = true
    let instance
    // 如果有children，则是容器类型
    if (Object.hasOwnProperty.call(child, 'children')) {
      // 暂存child
      const children = child.children
      delete child.children
      instance = Reflect.construct(classes[type], [child])
      parsePage(instance, children)
    } else {
      instance = Reflect.construct(classes[type], [child])
    }
    root.children.push(instance.render())
  })
}
