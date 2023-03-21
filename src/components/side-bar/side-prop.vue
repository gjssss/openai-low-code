<template>
  <div>
    <div class="px-10px">
      <span class="text-20px fw-600">组件名称：</span
      ><span class="text-18px fw-500">{{ currentComponent.name }}</span>
    </div>
    <base-props
      prop-name="padding"
      title="内边距"
      icon="icon-padding"
    ></base-props>
    <base-props
      prop-name="margin"
      title="外边距"
      icon="icon-margin"
    ></base-props>
    <base-props
      prop-name="border-radius"
      title="边框半径"
      icon="icon-radius"
      icon-left="icon-radius-bottomleft"
      icon-right="icon-radius-upright"
      icon-up="icon-radius-upleft"
      icon-down="icon-radius-bottomright"
    ></base-props>
    <base-props
      prop-name="border-width"
      title="边框大小"
      icon="icon-border"
      icon-left="icon-border-left"
      icon-right="icon-border-right"
      icon-up="icon-border-top"
      icon-down="icon-border-bottom"
    ></base-props>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '../../stores/component'
import baseProps from './widgets/base-props.vue'

const component = useComponentStore()
const { currentComponent } = storeToRefs(component)
</script>
