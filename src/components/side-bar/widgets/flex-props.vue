<template>
  <n-card class="my-10px" title="边框属性" size="small" hoverable embedded>
    <prop-layout>
      <div size="12">
        <span class="icon-up-circle" />
        <n-color-picker :modes="['hex']" />
      </div>
      <div size="12">
        <span class="icon-up-circle" />
        <n-color-picker :modes="['hex']" />
      </div>
    </prop-layout>
  </n-card>
</template>

<script setup>
import { NCard, NColorPicker } from 'naive-ui'
import PropLayout from './prop-layout.vue'
</script>

<style></style>
