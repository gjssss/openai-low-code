<template>
  <n-card class="my-10px" :title="title" size="small" hoverable embedded>
    <template #header-extra>
      <n-switch v-model:value="paddingSelect" size="small" :round="false">
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
    <div v-if="paddingSelect" class="flex flex-row flex-wrap w-full">
      <div class="w-50% flex flex-row py-2px">
        <div class="w-20% text-right flex-center px-4px">
          <span
            class="iconfont text-18px"
            :class="props.iconUp ? props.iconUp : 'icon-up-circle'"
          ></span>
        </div>
        <n-input-number
          class="w-80%"
          :value="parseStylePixel('up')"
          @update-value="(value) => formatStyleOutput(value, 'up')"
        ></n-input-number>
      </div>
      <div class="w-50% flex flex-row py-2px">
        <div class="w-20% text-right flex-center px-4px">
          <span
            class="iconfont text-18px"
            :class="props.iconRight ? props.iconRight : 'icon-right-circle'"
          ></span>
        </div>
        <n-input-number
          class="w-80%"
          :value="parseStylePixel('right')"
          @update-value="(value) => formatStyleOutput(value, 'right')"
        ></n-input-number>
      </div>
      <div class="w-50% flex flex-row py-2px">
        <div class="w-20% text-right flex-center px-4px">
          <span
            class="iconfont text-18px"
            :class="props.iconLeft ? props.iconLeft : 'icon-left-circle'"
          ></span>
        </div>
        <n-input-number
          class="w-80%"
          :value="parseStylePixel('left')"
          @update-value="(value) => formatStyleOutput(value, 'left')"
        ></n-input-number>
      </div>
      <div class="w-50% flex flex-row py-2px">
        <div class="w-20% text-right flex-center px-4px">
          <span
            class="iconfont text-18px"
            :class="props.iconDown ? props.iconDown : 'icon-down-circle'"
          ></span>
        </div>
        <n-input-number
          class="w-80%"
          :value="parseStylePixel('down')"
          @update-value="(value) => formatStyleOutput(value, 'down')"
        ></n-input-number>
      </div>
    </div>
    <div v-else class="flex w-full">
      <div class="w-full flex flex-row py-2px">
        <div class="w-20% text-right flex-center px-4px">
          <span class="iconfont text-18px" :class="props.icon"></span>
        </div>
        <n-input-number
          class="w-80%"
          :value="parseStylePixel()"
          @update-value="(value) => formatStyleOutput(value)"
        ></n-input-number>
      </div>
    </div>
    <slot></slot>
  </n-card>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '../../../stores/component'
import { NCard, NSwitch, NInputNumber } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'

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
const paddingSelect = ref(false)
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

<style></style>
