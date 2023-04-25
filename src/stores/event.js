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
    stringify() {
      return JSON.stringify({
        eventList: this.eventList,
        count: this.count,
      })
    },
    parse(json) {
      this.eventList = json.eventList
      this.count = json.count
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
