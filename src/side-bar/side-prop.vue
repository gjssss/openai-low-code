<template>
  <div v-if="currentComponent">
    <div class="p-10px">
      <div class="text-20px fw-600">组件名称：</div>
      <n-input
        type="text"
        size="small"
        placeholder="组件名称"
        v-model:value.trim="currentComponent.name"
        :round="true"
      />
    </div>
    <n-collapse
      display-directive="show"
      arrow-placement="right"
      :default-expanded-names="['0']"
      :accordion="true"
    >
      <n-collapse-item name="0">
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
      </n-collapse-item>
      <n-collapse-item
        v-for="(componentArray, name, index) in currentComponent.extraProps"
        :name="index"
        :key="index"
      >
        <template #header>
          <div
            class="mx-10% text-center py-5px w-80% collapse-header hover:shadow-md trans-all"
          >
            <span class="text-16px fw-500">{{ name }}</span>
          </div>
        </template>
        <template #arrow> <span></span> </template>
        <component
          v-for="(comp, i) in componentArray"
          :key="i"
          :is="comp"
        ></component>
      </n-collapse-item>
    </n-collapse>
  </div>
  <div v-else>
    <div class="mt-20px text-24px text-center fw-500">
      <div>还没有选中组件哦</div>
      <div>(●'◡'●)</div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '@/stores/component'
import fourProps from './widgets/four-props.vue'
import borderProp from './components/border-prop.vue'
import sizeProp from './components/size-prop.vue'
import { NCollapse, NCollapseItem, NInput } from 'naive-ui'

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
