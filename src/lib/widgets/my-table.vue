<template>
  <n-table
    :bordered="bordered"
    :size="size"
    :striped="striped"
    :bottom-bordered="props['bottom-bordered']"
    :single-column="props['single-column']"
    :single-line="props['single-line']"
  >
    <thead>
      <tr>
        <th v-for="(item, index) in tableValue.value" :key="index">
          {{ item.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(_, index) in Array(tableValue.max)" :key="index">
        <th v-for="(item, i) in tableValue.value" :key="i">
          {{ item.cols[index] }}
        </th>
      </tr>
    </tbody>
  </n-table>
</template>
<script setup>
import { NTable } from 'naive-ui'
import { computed } from 'vue'
const props = defineProps([
  'value',
  'bottom-bordered',
  'bordered',
  'single-column',
  'single-line',
  'size',
  'striped',
])
const tableValue = computed(() => {
  const value = props.value
  const max = value.reduce((max, item) => Math.max(max, item.cols.length), 0)
  value
    .filter((i) => i.cols.length < max)
    .forEach((i) =>
      i.cols.splice(i.cols.length, 0, ...Array(max - i.cols.length).fill(''))
    )
  return { value, max }
})
</script>

<style></style>
