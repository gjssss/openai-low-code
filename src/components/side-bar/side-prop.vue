<template>
  {{ currentComponent.name }}
  <n-input
    v-if="currentComponent"
    v-model:value="obj[currentComponent.show.name]"
  ></n-input>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '../../stores/component'
import { NInput } from 'naive-ui'
import { computed } from 'vue'

const component = useComponentStore()
const { currentComponent } = storeToRefs(component)

const obj = computed(() => {
  return currentComponent.value.show.isStyle
    ? currentComponent.value.props.style
    : currentComponent.value.props
})
</script>
