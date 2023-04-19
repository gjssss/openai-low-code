<template>
  <div class="w-full flex justify-around">
    <div class="flex">
      <NButton type="primary" @click="emits('addRow')">加一行</NButton>
      <NButton
        type="error"
        :disabled="value[0].cols.length <= 1"
        @click="emits('rmRow')"
        >删一行</NButton
      >
    </div>
    <div class="flex">
      <NButton type="primary" @click="emits('addCol')">加一列</NButton>
      <NButton
        :disabled="value.length <= 1"
        type="error"
        @click="emits('rmCol')"
        >删一列</NButton
      >
    </div>
  </div>
  <div class="w-full px-10px mt-10px">
    <div v-for="(item, index) in value" :key="index">
      <div class="flex">
        <div class="text-18px w-120px">标题{{ index + 1 }}</div>
        <NInput
          :value="item.label"
          @update:value="
            (value) => emits('update', 'value[' + index + '].label', value)
          "
        ></NInput>
      </div>
      <div class="flex" v-for="(col, i) in item.cols" :key="i">
        <div class="text-14px w-100px ml-20px">栏{{ i + 1 }}</div>
        <NInput
          :value="col"
          @update:value="
            (value) =>
              emits('update', 'value[' + index + '].cols[' + i + ']', value)
          "
        ></NInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButton, NInput } from 'naive-ui'
defineProps(['value'])
const emits = defineEmits(['update', 'addCol', 'addRow', 'rmRow', 'rmCol'])
</script>

<style></style>
