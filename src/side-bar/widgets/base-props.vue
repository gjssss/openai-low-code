<template>
  <n-card class="my-10px" :title="title" size="small" hoverable embedded>
    <template #header-extra>
      <n-switch
        v-model:value="_select"
        size="small"
        :round="false"
        v-if="props.isSwitch"
      >
        <template #checked-icon>
          <span
            class="iconfont"
            :class="
              props.advanceIcon ? props.advanceIcon : 'icon-kuozhanshuxing'
            "
          />
        </template>
        <template #checked>
          {{ props.advanceTitle ? props.advanceTitle : '高级设置' }}
        </template>
        <template #unchecked-icon>
          <span
            class="iconfont"
            :class="props.baseIcon ? props.baseIcon : 'icon-jichu'"
          />
        </template>
        <template #unchecked>
          {{ props.baseTitle ? props.baseTitle : '基础设置' }}
        </template>
      </n-switch>
      <span class="iconfont px-5px" :class="props.icon" />
    </template>
    <template v-if="props.isSwitch">
      <prop-layout v-if="_select">
        <slot name="detail"></slot>
      </prop-layout>
      <prop-layout v-else>
        <slot></slot>
      </prop-layout>
    </template>
    <template v-else>
      <prop-layout><slot name="default"></slot></prop-layout>
    </template>
    <prop-layout><slot name="more"></slot></prop-layout>
  </n-card>
</template>

<script setup>
import { NCard, NSwitch } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useComponentStore } from '@/stores/component'
import PropLayout from './prop-layout.vue'

const props = defineProps([
  'title',
  'icon',
  'is-switch',
  'prop-name',
  'base-title',
  'base-icon',
  'advance-title',
  'advance-icon',
])
const _select = ref(false)
const component = useComponentStore()
const { currentComponent, select } = storeToRefs(component)

watch(_select, (newVal) => {
  currentComponent.value.settings[props.propName + '-more'] = newVal
})
watch(select, bind)
function bind() {
  // 将更多属性保存在setting内 如setting['padding-more'] = true
  if (currentComponent.value.settings[props.propName + '-more'] === undefined) {
    currentComponent.value.settings[props.propName + '-more'] = false
    _select.value = false
  } else {
    _select.value = currentComponent.value.settings[props.propName + '-more']
  }
}
onMounted(() => {
  bind()
})
</script>
