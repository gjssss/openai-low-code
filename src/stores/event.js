import { defineStore } from 'pinia'
export const useEventStore = defineStore('event', {
  state: () => ({
    eventList: [],
    count: 0,
  }),
  actions: {
    registerEvent(event) {
      event.id = this.count++
      this.eventList.push(event)
      return event.id
    },
  },
  getters: {
    eventOption: (state) => {
      return state.eventList.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    },
  },
})
