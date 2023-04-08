<template>
  <div class="flex">
    <div class="h-screen w-content-screen">
      <div class="h-top-tab w-full shadow-md flex items-center px-20px">
        <NButton type="primary" @click="save" class="mr-10px">保存</NButton>
        <NButton type="primary" @click="load" class="mr-10px">加载</NButton>
      </div>
      <editor-view></editor-view>
    </div>
    <side-bar></side-bar>
  </div>
</template>

<script setup>
import SideBar from '../side-bar/side-bar.vue'
import editorView from '../editor-view/editor-view.vue'
import { NButton, useMessage } from 'naive-ui'
import { savePage, loadPage } from '../lib/utils/save'

window.$message = useMessage()

function save() {
  savePage()
}
function load() {
  loadPage()
}
</script>

<style>
.w-sider-bar {
  width: 320px;
}
.w-content-screen {
  width: calc(100vw - 320px);
}
.h-top-tab {
  height: 50px;
}
.h-editor-view {
  height: calc(100vh - 50px);
}
</style>
