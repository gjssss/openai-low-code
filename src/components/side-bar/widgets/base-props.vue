<template>
  <n-card class="my-10px" :title="title" size="small" hoverable embedded>
    <template #header-extra>
      <n-switch v-model:value="_select" size="small" :round="false">
        <template #checked-icon>
          <span class="iconfont icon-kuozhanshuxing" />
        </template>
        <template #checked> 高级设置 </template>
        <template #unchecked-icon>
          <span class="iconfont icon-jichu" />
        </template>
        <template #unchecked> 基础设置 </template>
      </n-switch>
      <span class="iconfont px-5px" :class="props.icon" />
    </template>
    <prop-layout v-if="_select">
      <div size="12">
        <span :class="props.iconUp ? props.iconUp : 'icon-up-circle'" />
        <n-input-number
          :value="parseStylePixel('up')"
          @update-value="(value) => formatStyleOutput(value, 'up')"
        ></n-input-number>
      </div>
      <div size="12">
        <span
          :class="props.iconRight ? props.iconRight : 'icon-right-circle'"
        />
        <n-input-number
          :value="parseStylePixel('right')"
          @update-value="(value) => formatStyleOutput(value, 'right')"
        ></n-input-number>
      </div>
      <div size="12">
        <span :class="props.iconLeft ? props.iconLeft : 'icon-left-circle'" />
        <n-input-number
          :value="parseStylePixel('left')"
          @update-value="(value) => formatStyleOutput(value, 'left')"
        ></n-input-number>
      </div>
      <div size="12">
        <span :class="props.iconDown ? props.iconDown : 'icon-down-circle'" />
        <n-input-number
          :value="parseStylePixel('down')"
          @update-value="(value) => formatStyleOutput(value, 'down')"
        ></n-input-number>
      </div>
    </prop-layout>
    <prop-layout v-else>
      <div size="24">
        <span :class="props.icon" />
        <n-input-number
          :value="parseStylePixel()"
          @update-value="(value) => formatStyleOutput(value)"
        ></n-input-number>
      </div>
    </prop-layout>
  </n-card>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '../../../stores/component'
import { NCard, NSwitch, NInputNumber } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'
import PropLayout from './prop-layout.vue'
const props = defineProps([
  'prop-name',
  'title',
  'icon',
  'icon-left',
  'icon-right',
  'icon-up',
  'icon-down',
])

console.log(props.iconDown)
const _select = ref(false)
const isMounted = ref(false)
const up = ref(0)
const down = ref(0)
const left = ref(0)
const right = ref(0)

const propAll = computed(() => {
  return Math.max(up.value, down.value, left.value, right.value)
})

const component = useComponentStore()
const { currentComponent, select } = storeToRefs(component)

watch(select, bind)
watch(_select, (newVal) => {
  currentComponent.value.settings[props.propName + '-more'] = newVal
})

function parseStylePixel(prop) {
  if (isMounted.value) {
    // 如果输入了prop, 则有方向
    if (prop) {
      if (prop === 'left') {
        return left.value
      } else if (prop === 'right') {
        return right.value
      } else if (prop === 'up') {
        return up.value
      } else {
        return down.value
      }
    } else {
      return propAll.value
    }
  } else {
    return 0
  }
}

function formatStyleOutput(value, prop) {
  if (prop) {
    if (prop === 'left') {
      left.value = value
    } else if (prop === 'right') {
      right.value = value
    } else if (prop === 'up') {
      up.value = value
    } else {
      down.value = value
    }
  } else {
    left.value = value
    right.value = value
    up.value = value
    down.value = value
  }
  currentComponent.value.props.style[
    props.propName
  ] = `${up.value}px ${right.value}px ${down.value}px ${left.value}px`
}

function bind() {
  // 将更多属性保存在setting内 如setting['padding-more'] = true
  if (currentComponent.value.settings[props.propName + '-more'] === undefined) {
    currentComponent.value.settings[props.propName + '-more'] = false
  } else {
    _select.value = currentComponent.value.settings[props.propName + '-more']
  }
  const id = currentComponent.value.id
  const styles = window.getComputedStyle(document.getElementById('com-' + id))
  const arr = styles[props.propName].split(' ')
  // 初始化属性
  if (arr.length === 1) {
    left.value = parseInt(arr[0])
    right.value = parseInt(arr[0])
    up.value = parseInt(arr[0])
    down.value = parseInt(arr[0])
  } else if (arr.length === 2) {
    up.value = parseInt(arr[0])
    down.value = parseInt(arr[0])
    left.value = parseInt(arr[1])
    right.value = parseInt(arr[1])
  } else if (arr.length === 3) {
    up.value = parseInt(arr[0])
    left.value = parseInt(arr[1])
    right.value = parseInt(arr[1])
    down.value = parseInt(arr[2])
  } else {
    up.value = parseInt(arr[0])
    right.value = parseInt(arr[1])
    down.value = parseInt(arr[2])
    left.value = parseInt(arr[3])
  }

  // 设置属性
  if (!currentComponent.value.props.style[props.propName]) {
    currentComponent.value.props.style[
      props.propName
    ] = `${up.value}px ${right.value}px ${down.value}px ${left.value}px`
  }
}

onMounted(() => {
  isMounted.value = true
  bind()
})
</script>
