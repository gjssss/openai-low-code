<template>
  <div>
    <div class="px-10px">
      <span class="text-20px fw-600">组件名称：</span
      ><span class="text-18px fw-500">{{ currentComponent.name }}</span>
    </div>
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
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '../../stores/component'
import fourProps from './widgets/four-props.vue'
import borderProp from './components/border-prop.vue'

const component = useComponentStore()
const { currentComponent } = storeToRefs(component)
</script>
