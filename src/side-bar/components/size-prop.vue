<template>
  <BaseProps
    title="基础"
    icon="icon-resize"
    :is-switch="true"
    prop-name="size"
    base-title="像素px"
    advance-title="百分比%"
    base-icon="icon-pixels"
    advance-icon="icon-24gf-percent"
  >
    <template #default>
      <div size="12">
        <span class="icon-width" />
        <n-input-number
          :value="widthPx"
          @update:value="
            (value) => {
              widthPx = value
              component.setProp('width', value + 'px', true)
            }
          "
        />
      </div>
      <div size="12">
        <span class="icon-height" />
        <n-input-number
          :value="heightPx"
          @update:value="
            (value) => {
              heightPx = value
              component.setProp('height', value + 'px', true)
            }
          "
        />
      </div>
    </template>
    <template #more>
      <div size="12">
        <span class="icon-color stroke" :style="{ color: backgroundColor }" />
        <n-color-picker
          :modes="['hex']"
          :value="backgroundColor"
          @update:value="
            (value) => {
              component.setProp('background-color', value, true)
              backgroundColor = value
            }
          "
        />
      </div>
      <div size="12">
        <span class="icon-color stroke" :style="{ color: textColor }" />
        <n-color-picker
          :modes="['hex']"
          :value="textColor"
          @update:value="
            (value) => {
              component.setProp('color', value, true)
              textColor = value
            }
          "
        />
      </div>
    </template>
  </BaseProps>
</template>

<script setup>
import BaseProps from '../widgets/base-props.vue'
import { NInputNumber, NColorPicker } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useComponentStore } from '@/stores/component'
import { rgbaToHex } from '@/utils/color.js'

const component = useComponentStore()
const { select } = storeToRefs(component)

watch(select, bind)
const widthPx = ref(0)
const heightPx = ref(0)
const backgroundColor = ref('')
const textColor = ref('')
function bind() {
  widthPx.value = parseInt(
    component.getProp('width', false, true).split('px')[0]
  )
  heightPx.value = parseInt(
    component.getProp('height', false, true).split('px')[0]
  )
  backgroundColor.value = rgbaToHex(
    component.getProp('background-color', false, true)
  )
  textColor.value = rgbaToHex(component.getProp('color', false, true))
}
onMounted(() => {
  bind()
})
</script>

<style>
.stroke {
  -webkit-text-stroke: 1px black; /* 在文本边缘添加 1 像素宽度的黑色描边 */
}
</style>
