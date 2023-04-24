<template>
  <div class="flex flex-col items-center pt-20px">
    <NTable
      :bordered="false"
      :single-line="false"
      class="mb-20px"
      v-if="eventList.length > 0"
    >
      <thead>
        <tr class="text-center">
          <th>事件名称</th>
          <th>触发条件</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in eventList" :key="index">
          <td>{{ item.name }}</td>
          <td>
            <span v-for="t in item.trigger" :key="t.value" class="trigger">
              {{ t.label }}
            </span>
          </td>
        </tr>
      </tbody>
    </NTable>
    <NButton class="w-80%" type="primary" circle @click="showModal = true">
      添加事件
    </NButton>
  </div>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="添加事件"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex">
        <div class="flex-center">事件名称：</div>
        <NInput
          v-model:value="eventName"
          class="max-w-300px"
          placeholder="请输入事件名称"
        />
      </div>
      <div class="flex mt-20px">
        <div class="flex-center">触发条件：</div>
        <NSelect
          multiple
          class="w-300px"
          v-model:value="trigger"
          :options="triggerOption"
          placeholder="请选择事件触发条件"
        />
      </div>
      <div class="flex mt-20px">
        <div class="flex-center">触发事件：</div>
        <NSelect
          class="w-300px"
          v-model:value="eventFuncName"
          :options="eventOption"
          placeholder="请选择触发事件"
        />
      </div>
      <template #footer>
        <NButton type="success" @click="addEvent">添加</NButton>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { NButton, NModal, NCard, NSelect, NTable, NInput } from 'naive-ui'
import { ref } from 'vue'
import { useEventStore } from '@/stores/event.js'
import { storeToRefs } from 'pinia'

const event = useEventStore()
const { eventList } = storeToRefs(event)

const showModal = ref(false)

const trigger = ref([])
const eventFuncName = ref('')
const eventName = ref('')

const triggerOption = [
  {
    label: '左键点击',
    value: 'onClick-left',
  },
  {
    label: '右键点击',
    value: 'onClick-right',
  },
  {
    label: '中键点击',
    value: 'onClick-middle',
  },
]
const eventOption = [
  {
    label: '开心一下',
    value: 'happy',
  },
]

function addEvent() {
  event.registerEvent({
    name: eventName.value,
    trigger: triggerOption.filter((item) => trigger.value.includes(item.value)),
    eventFuncName: eventOption.find(
      (item) => eventFuncName.value === item.value
    ),
  })
  trigger.value.splice(0)
  eventFuncName.value = ''
  eventName.value = ''
  showModal.value = false
}
</script>

<style>
.trigger {
  background-color: #f6f8fa;
  padding: 0.5em;
  margin: 0 0.5em;
  font-size: 0.5em;
}
</style>
