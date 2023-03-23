<template>
  <div>
    <div class="p-10px">
      <span class="text-20px fw-600">组件名称：</span
      ><span class="text-18px fw-500">{{ currentComponent.name }}</span>
    </div>
    <n-collapse
      display-directive="show"
      arrow-placement="right"
      :default-expanded-names="['1']"
    >
      <n-collapse-item name="1">
        <template #header>
          <div
            class="mx-10% text-center py-5px w-80% collapse-header hover:shadow-md trans-all"
          >
            <span class="text-16px fw-500">基础信息</span>
          </div>
        </template>
        <template #arrow> <span></span> </template>
        <size-prop></size-prop>
        <four-props
          prop-name="padding"
          title="内边距"
          icon="icon-padding"
        ></four-props>
        <four-props
          prop-name="margin"
          title="外边距"
          icon="icon-margin"
        ></four-props>
      </n-collapse-item>
    </n-collapse>
    <border-prop></border-prop>
    <four-props
      prop-name="border-radius"
      title="边框半径"
      icon="icon-radius"
      icon-left="icon-radius-bottomleft"
      icon-right="icon-radius-upright"
      icon-up="icon-radius-upleft"
      icon-down="icon-radius-bottomright"
    ></four-props>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '@/stores/component'
import fourProps from './widgets/four-props.vue'
import borderProp from './components/border-prop.vue'
import sizeProp from './components/size-prop.vue'
import { NCollapse, NCollapseItem } from 'naive-ui'

const component = useComponentStore()
const { currentComponent } = storeToRefs(component)
</script>

<style>
.collapse-header {
  background-color: #fafafc;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

/* 修改naive-ui css */
.n-collapse
  .n-collapse-item
  .n-collapse-item__content-wrapper
  .n-collapse-item__content-inner {
  padding: 0;
}
</style>
