<template>
  <div class="w-sider-bar h-screen shadow-xl">
    <n-tabs
      type="line"
      :tab-style="{
        width: '160px',
        display: 'flex',
        'justify-content': 'center',
      }"
      v-model:value="select"
    >
      <n-tab name="prop"> 属性 </n-tab>
      <n-tab name="comp"> 组件 </n-tab>
    </n-tabs>
    <div class="overflow-y-auto">
      <component :is="comMap[select]"></component>
    </div>
  </div>
</template>

<script setup>
import { NTabs, NTab } from 'naive-ui'
import { ref } from 'vue'
import sideCom from './side-com.vue'
import sideProp from './side-prop.vue'
const select = ref('prop')
const comMap = {
  prop: sideProp,
  comp: sideCom,
}
</script>
