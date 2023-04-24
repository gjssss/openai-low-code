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
        <span class="iconfont text-18px icon-width" />
        <n-input-number
          :min="0"
          :value="widthPx"
          @update:value="updateWidthPx"
        />
      </div>
      <div size="12">
        <span class="iconfont text-18px icon-height" />
        <n-input-number
          :min="0"
          :value="heightPx"
          @update:value="updateHeightPx"
        />
      </div>
    </template>
    <template #detail>
      <div size="12">
        <span class="iconfont text-18px icon-width" />
        <n-input-number
          :value="widthPercent"
          @update:value="updateWidthPc"
          :min="0"
        />
      </div>
      <div size="12">
        <span class="iconfont text-18px icon-height" />
        <n-input-number
          :value="heightPercent"
          @update:value="updateHeightPc"
          :min="0"
        />
      </div>
    </template>
    <template #more>
      <div size="12">
        <span
          class="iconfont text-18px icon-color stroke"
          :style="{ color: backgroundColor }"
        />
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
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="iconfont text-18px icon-box" />
          </template>
          是否将内边距和边框算入width中
        </n-tooltip>
        <n-switch :value="boxSizing" @update:value="updateBoxSizing"></n-switch>
      </div>
      <div size="12">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="iconfont text-18px icon-text-overflow" />
          </template>
          发生溢出是否隐藏
        </n-tooltip>
        <n-switch :value="overflow" @update:value="updateOverflow"></n-switch>
      </div>
      <div size="12">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="iconfont text-18px icon-box-shadow" />
          </template>
          阴影
        </n-tooltip>
        <n-switch :value="shadow" @update:value="updateShadow"></n-switch>
      </div>
    </template>
  </BaseProps>
</template>

<script setup>
import BaseProps from '../widgets/base-props.vue'
import { NInputNumber, NColorPicker, NSwitch, NTooltip } from 'naive-ui'
import { onMounted, ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useComponentStore } from '@/stores/component'
import { rgbaToHex } from '@/utils/color.js'

const component = useComponentStore()
const { _updateFlag, fatherWidth, fatherHeight, currentComponent } =
  storeToRefs(component)

watch(_updateFlag, bind)

const widthPx = ref(0)
const heightPx = ref(0)
const backgroundColor = ref('')
const textColor = ref('')
const boxSizing = ref(false)
const overflow = ref(false)
const shadow = ref(false)

function updateWidthPx(value) {
  widthPx.value = value
  currentComponent.value.settings['width-percent'] = widthPercent.value
  component.setProp('width', value + 'px', true)
}

function updateHeightPx(value) {
  heightPx.value = value
  currentComponent.value.settings['height-percent'] = heightPercent.value
  component.setProp('height', value + 'px', true)
}

function updateWidthPc(value) {
  widthPx.value = Math.round((value * fatherWidth.value) / 100)
  currentComponent.value.settings['width-percent'] = value
  component.setProp('width', widthPx.value + 'px', true)
}
function updateHeightPc(value) {
  heightPx.value = Math.round((value * fatherHeight.value) / 100)
  currentComponent.value.settings['height-percent'] = value
  component.setProp('height', heightPx.value + 'px', true)
}

function updateBoxSizing(value) {
  component.setProp('box-sizing', value ? 'border-box' : 'content-box', true)
  boxSizing.value = value
}

function updateOverflow(value) {
  component.setProp('overflow', value ? 'hidden' : 'visible', true)
  overflow.value = value
}

function updateShadow(value) {
  component.currentComponent.props.class['shadow-xl'] = value
  shadow.value = value
}

const widthPercent = computed(() => {
  return Math.round((widthPx.value / fatherWidth.value) * 100)
})
const heightPercent = computed(() => {
  return Math.round((heightPx.value / fatherHeight.value) * 100)
})

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
  boxSizing.value =
    component.getProp('box-sizing', false, true) === 'border-box'
  overflow.value = component.getProp('overflow', false, true) === 'hidden'
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
