<template>
  <div class="w-100% flex flex-col items-center">
    <div class="w-80% flex mt-20px">
      <NSelect
        placeholder="请选择已创建的事件"
        multiple
        :options="eventOption"
        v-model:value="currentComponent.eventsComputed"
      />
    </div>
  </div>
</template>

<script setup>
import { useComponentStore } from '@/stores/component'
import { useEventStore } from '@/stores/event'
import { NSelect } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const event = useEventStore()
const component = useComponentStore()

const { currentComponent } = storeToRefs(component)

const eventOption = computed(() =>
  event.eventList.map((item) => {
    return {
      label: item.name,
      value: item.id,
      disabled: Boolean(
        currentComponent.value.events.find((i) => i.id === item.id)
      ),
    }
  })
)
</script>

<style></style>
