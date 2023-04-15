import { computed } from 'vue'
import { savePage, loadPage } from '../lib/utils/save'
import { useComponentStore } from '../stores/component'
const component = useComponentStore()
export const menuOpt = computed(() => [
  {
    label: '页面选项',
    key: 'page',
    children: [
      {
        label: '保存页面',
        key: 'savePage',
        callBack: savePage,
      },
      {
        label: '加载页面',
        key: 'loadPage',
        callBack: () => {
          component.clear()
          loadPage()
        },
      },
    ],
  },
  {
    label: component.currentComponent
      ? '当前组件：' + component.currentComponent.name
      : '没有选中组件',
    key: 'component',
    children: component.compSet
      .filter((i) => i.name !== '__root__')
      .map((comp) => ({
        label: comp.name,
        key: comp.id,
        callBack: () => {
          component.selectComponent(comp.id)
        },
      })),
  },
])
