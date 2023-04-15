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
import { useMessage, NMenu } from 'naive-ui'
import { h, computed } from 'vue'
import { savePage, loadPage } from '../lib/utils/save'
import { useComponentStore } from '../stores/component'
const component = useComponentStore()
const menuOpt = computed(() => [
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
          component.select = comp.id
          component.updateBindProp()
        },
      })),
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
