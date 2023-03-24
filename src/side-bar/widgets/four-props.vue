<template>
  <baseProps
    :title="props.title"
    :icon="props.icon"
    :is-switch="true"
    :prop-name="props.propName"
  >
    <template #detail>
      <div size="12">
        <span
          class="iconfont text-18px"
          :class="props.iconUp ? props.iconUp : 'icon-up-circle'"
        />
        <n-input-number
          :value="parseStylePixel('up')"
          @update-value="(value) => formatStyleOutput(value, 'up')"
        ></n-input-number>
      </div>
      <div size="12">
        <span
          class="iconfont text-18px"
          :class="props.iconRight ? props.iconRight : 'icon-right-circle'"
        />
        <n-input-number
          :value="parseStylePixel('right')"
          @update-value="(value) => formatStyleOutput(value, 'right')"
        ></n-input-number>
      </div>
      <div size="12">
        <span
          class="iconfont text-18px"
          :class="props.iconLeft ? props.iconLeft : 'icon-left-circle'"
        />
        <n-input-number
          :value="parseStylePixel('left')"
          @update-value="(value) => formatStyleOutput(value, 'left')"
        ></n-input-number>
      </div>
      <div size="12">
        <span
          class="iconfont text-18px"
          :class="props.iconDown ? props.iconDown : 'icon-down-circle'"
        />
        <n-input-number
          :value="parseStylePixel('down')"
          @update-value="(value) => formatStyleOutput(value, 'down')"
        ></n-input-number>
      </div>
    </template>
    <template #default>
      <div size="24">
        <span class="iconfont text-18px" :class="props.icon" />
        <n-input-number
          :value="parseStylePixel()"
          @update-value="(value) => formatStyleOutput(value)"
        ></n-input-number>
      </div>
    </template>
    <template #more>
      <slot></slot>
    </template>
  </baseProps>
</template>

<script setup>
import baseProps from './base-props.vue'
import { NInputNumber } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'
import { useComponentStore } from '@/stores/component'
import { storeToRefs } from 'pinia'
const props = defineProps([
  'prop-name',
  'title',
  'icon',
  'icon-left',
  'icon-right',
  'icon-up',
  'icon-down',
])
const isMounted = ref(false)
const up = ref(0)
const down = ref(0)
const left = ref(0)
const right = ref(0)

const propAll = computed(() => {
  return Math.max(up.value, down.value, left.value, right.value)
})

const component = useComponentStore()
const { _updateFlag } = storeToRefs(component)

watch(_updateFlag, bind)

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
    // 判断是否是四个方向
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
    // 不是四个方向的就设置四个为一样的值
    left.value = value
    right.value = value
    up.value = value
    down.value = value
  }
  component.setProp(
    props.propName,
    `${up.value}px ${right.value}px ${down.value}px ${left.value}px`,
    true
  )
}

function bind() {
  const arr = component.getProp(props.propName, false, true).split(' ')
  // 初始化属性

  // 下面根据四值规则更改属性，一个值就是四个方向相同，两个值就是上下和左右等
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
}

onMounted(() => {
  isMounted.value = true
  bind()
})
</script>
