<template>
  <div id="component" class="p-20px">
    <div class="flex justify-between">
      <div class="w-80px h-100px">
        <div
          class="w-80px h-80px rounded-10px b-$border-color b-2px border-dotted hover:shadow-lg trans-all flex-center"
          v-drag="dragOption"
        >
          <btn name="Button" />
        </div>
        <div class="w-full h-20px flex-center text-14px">
          <n-tooltip trigger="hover">
            <template #trigger> 按钮 </template>
            按钮就是用来按的
          </n-tooltip>
        </div>
      </div>
      <div class="w-80px h-100px">
        <div
          class="w-80px h-80px rounded-10px b-$border-color b-2px border-dotted hover:shadow-lg trans-all flex-center"
          v-drag="dragOption"
        >
          <container name="Container" />
        </div>
        <div class="w-full h-20px flex-center text-14px">
          <n-tooltip trigger="hover">
            <template #trigger> 容器 </template>
            可以往里面放点东西
          </n-tooltip>
        </div>
      </div>
      <div class="w-80px h-100px">
        <div
          class="w-80px h-80px rounded-10px b-$border-color b-2px border-dotted hover:shadow-lg trans-all flex-center"
          v-drag="dragOption"
        >
          <txt name="Text" />
        </div>
        <div class="w-full h-20px flex-center text-14px">
          <n-tooltip trigger="hover">
            <template #trigger> 文本 </template>
            来写一段文本吧
          </n-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useComponentStore } from '@/stores/component'
import { NTooltip } from 'naive-ui'
import * as Classes from '../lib'
const btn = Classes.Button.preview
const container = Classes.Container.preview
const txt = Classes.Text.preview

const component = useComponentStore()

const dragOption = {
  group: {
    name: 'editor',
    pull: 'clone',
    put: false,
  },
  animation: 150,
  sort: false,
  onEnd: function (e) {
    const instance = component.componentFromId(e.to.id)
    if (instance) {
      const newComponent = Reflect.construct(
        Classes[e.item.getAttribute('name')],
        [{ name: e.item.getAttribute('name'), class: ['trans-all'] }]
      )
      instance.addChildren(e.newIndex, newComponent)
      // 清除原有的item
      document.getElementById(e.to.id).removeChild(e.item)
    }
  },
}
</script>

<style></style>
