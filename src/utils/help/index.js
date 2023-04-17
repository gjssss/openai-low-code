import { h } from 'vue'
import ComponentHelp from './components/component-help.vue'
export function showComponentHelp() {
  window.$notification.create({
    title: '组件帮助',
    content: () => h(ComponentHelp),
    closable: true,
  })
}
