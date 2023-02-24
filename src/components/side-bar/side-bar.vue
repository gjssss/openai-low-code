<template>
  <div class="w-sider-bar h-screen">
    <n-tabs
      type="line"
      animated
      justify-content="center"
      class="h-full"
      pane-class="h-900px"
    >
      <n-tab-pane
        name="oasis"
        tab="属性"
        :tab-props="{ class: 'w-160px justify-center' }"
      >
        <side-prop></side-prop>
      </n-tab-pane>
      <n-tab-pane
        name="the beatles"
        tab="组件"
        :tab-props="{ class: 'w-160px justify-center' }"
      >
        <side-com></side-com>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { NTabs, NTabPane } from 'naive-ui'
import sideCom from './side-com.vue'
import sideProp from './side-prop.vue'
</script>

<style></style>
