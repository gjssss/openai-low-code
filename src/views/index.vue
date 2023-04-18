<template>
  <div class="flex">
    <div class="h-screen w-content-screen">
      <div class="h-top-tab w-full shadow-md flex items-center px-20px">
        <n-menu
          mode="horizontal"
          :value="null"
          :render-label="renderLabel"
          :options="menuOpt"
        />
      </div>
      <editor-view></editor-view>
    </div>
    <side-bar></side-bar>
  </div>
</template>

<script setup>
import SideBar from '../side-bar/side-bar.vue'
import editorView from '../editor-view/editor-view.vue'
import { useMessage, useNotification, NMenu } from 'naive-ui'
import { h, computed } from 'vue'
import { savePage, loadPage } from '../lib/utils/save'
import { useComponentStore } from '../stores/component'
import { showComponentHelp } from '../utils/help'
import { selectComponent } from '@/lib/utils/register'
import { Container } from '@/lib'

const component = useComponentStore()
window.component = component

function _map(child) {
  const prop = {
    label: child.name,
    key: child.id,
    callBack: () => {
      selectComponent(child.id)
    },
  }
  if (component.currentComponent === child) {
    prop.label += '👈'
    prop.flag = true
  } else {
    prop.flag = false
  }
  if (child instanceof Container) {
    prop.children = child.children.map(_map)
    if (prop.children.reduce((sum, val) => sum | val.flag, false)) {
      prop.label += '👉'
      prop.flag = true
    }
  }
  return prop
}

const menuOpt = computed(() => [
  {
    label: component.currentComponent
      ? '当前组件：' + component.currentComponent.name + '👈'
      : '没有选中组件🤷‍♂️',
    key: 'component',
    children: component.root ? component.root.children.map(_map) : [],
  },
  {
    label: '页面选项📄',
    key: 'page',
    children: [
      {
        label: '保存页面💾',
        key: 'savePage',
        callBack: savePage,
      },
      {
        label: '加载页面🖊',
        key: 'loadPage',
        callBack: () => {
          component.clear()
          loadPage()
        },
      },
    ],
  },
  {
    label: '帮助🎓',
    key: 'help',
    children: [
      {
        label: '组件帮助🤓',
        key: 'helpComponent',
        callBack: showComponentHelp,
      },
    ],
  },
])

function renderLabel(opt) {
  const props = { class: 'menu-item' }
  if (Object.hasOwnProperty.call(opt, 'callBack')) {
    props.onClick = opt.callBack
  }
  return h('div', props, opt.label)
}

window.$message = useMessage()
window.$notification = useNotification()
</script>

<style>
.w-sider-bar {
  width: 320px;
}
.w-content-screen {
  width: calc(100vw - 320px);
}
.h-top-tab {
  height: 40px;
}
.h-editor-view {
  height: calc(100vh - 40px);
}
.menu-item {
  font-size: 12px;
}
</style>
