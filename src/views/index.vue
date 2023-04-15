<template>
  <div class="flex">
    <div class="h-screen w-content-screen">
      <div class="h-top-tab w-full shadow-md flex items-center px-20px">
        <n-menu
          mode="horizontal"
          :options="menuOpt"
          :value="null"
          :render-label="renderLabel"
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
import menuOpt from './menu'
import { h } from 'vue'

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
