<template>
  <four-props
    prop-name="border-width"
    title="边框"
    icon="icon-border"
    icon-left="icon-border-left"
    icon-right="icon-border-right"
    icon-up="icon-border-top"
    icon-down="icon-border-bottom"
  >
    <template #default>
      <div size="12">
        <span class="icon-color stroke" :style="{ color: selectColor }" />
        <n-color-picker
          :modes="['hex']"
          :value="selectColor"
          @update:value="
            (value) => {
              component.setProp('border-color', value, true)
              selectColor = value
            }
          "
        />
      </div>
      <div size="12">
        <span :class="'icon-line-' + selectStyle" />
        <n-select
          :value="selectStyle"
          @update:value="
            (value) => {
              component.setProp('border-style', value, true)
              selectStyle = value
            }
          "
          :options="borderStyle"
        />
      </div>
    </template>
  </four-props>
</template>

<script setup>
import fourProps from '../widgets/four-props.vue'
import { NColorPicker, NSelect } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useComponentStore } from '@/stores/component'
import { rgbaToHex } from '@/utils/color.js'

const component = useComponentStore()
const { select } = storeToRefs(component)
const selectStyle = ref('none')
const selectColor = ref('#00000000')

watch(select, bind)

const borderStyle = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: '实线',
    value: 'solid',
  },
  {
    label: '虚线',
    value: 'dashed',
  },
  {
    label: '圆点',
    value: 'dotted',
  },
  {
    label: '双实线',
    value: 'double',
  },
]

function bind() {
  selectStyle.value = component.getProp('border-style', 'none', true)
  selectColor.value = rgbaToHex(
    component.getProp('border-color', '#00000000', true)
  )
}

onMounted(() => {
  bind()
})
</script>

<style></style>
