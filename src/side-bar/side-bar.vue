<template>
  <div
    class="w-sider-bar h-screen hover:shadow-xl shadow-md overflow-auto scroller bg-white"
  >
    <n-tabs
      type="line"
      :tab-style="{
        width: '90px',
        display: 'flex',
        'justify-content': 'center',
      }"
      v-model:value="select"
    >
      <n-tab name="prop"> 属性 </n-tab>
      <n-tab name="comp"> 组件 </n-tab>
      <n-tab name="event"> 事件 </n-tab>
    </n-tabs>
    <div>
      <KeepAlive>
        <component :is="comMap[select]"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
import { NTabs, NTab } from 'naive-ui'
import { ref } from 'vue'
import sideCom from './side-com.vue'
import sideProp from './side-prop.vue'
import sideEvent from './side-event.vue'
const select = ref('prop')
const comMap = {
  prop: sideProp,
  comp: sideCom,
  event: sideEvent,
}
</script>
<style>
.scroller::-webkit-scrollbar {
  display: none;
}
</style>
