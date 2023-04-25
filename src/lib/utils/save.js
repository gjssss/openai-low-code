import * as classes from '@/lib'
import { useEventStore } from '@/stores/event'
import { usePageStore } from '@/stores/pages'

export function savePage() {
  // 命名规则：page-{key}-{label}
  const page = usePageStore()
  const event = useEventStore()
  localStorage.clear()
  Object.keys(page.pageSet).forEach((key) => {
    const elems = JSON.stringify(page.pageSet[key].root.jsonify().children)
    localStorage.setItem(`page-${key}-${page.pageSet[key].label}`, elems)
  })
  localStorage.setItem('select-page', page._page)
  localStorage.setItem('events', event.stringify())
  window.$message.success('保存成功')
}

export function loadPage() {
  const page = usePageStore()
  const event = useEventStore()
  const _pageSet = {}
  Object.keys(localStorage).forEach((keywordsStr) => {
    const keywords = keywordsStr.split('-')
    // page开头是标志
    if (keywords[0] !== 'page' || keywords.length < 3) {
      return
    } else {
      const key = keywords[1]
      const label = keywords.slice(2).join('-')
      let elems = localStorage.getItem(keywordsStr)
      try {
        elems = JSON.parse(elems)
      } catch (e) {
        return
      }
      _pageSet[key] = {
        root: new classes.Container({
          name: '__root__',
          plant: true,
          style: {
            width: '100%',
            height: '100%',
          },
          wrapper: {
            style: {
              width: '100%',
              height: '100%',
            },
            onClick: () => {},
          },
        }),
        label,
      }
      parsePage(_pageSet[key].root, elems)
    }
  })
  page.pageSet = _pageSet
  page._page = localStorage.getItem('select-page')
    ? localStorage.getItem('select-page')
    : 'index'
  event.parse(
    localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : { eventList: [], count: 0 }
  )
  window.$message.success('加载成功')
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
