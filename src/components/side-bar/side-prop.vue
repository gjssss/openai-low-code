<template>
  <!-- <n-input
    v-if="currentComponent"
    v-model:value="currentComponent.props.style.padding"
  ></n-input> -->
  <component :is="currentComponent.show()"></component>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useComponentStore } from '../../stores/component'

const component = useComponentStore()
const { currentComponent } = storeToRefs(component)
</script>

<style></style>
