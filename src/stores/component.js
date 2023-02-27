import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    compSet: {},
    count: 0,
    select: 0,
  }),
  actions: {
    push(componentClass) {
      const id = this.count
      this.compSet[id] = componentClass
      this.count++
      return id
    },
  },
  getters: {
    currentComponent: (state) => {
      if (state.select < 0) {
        return null
      } else {
        return state.compSet[state.select]
      }
    },
  },
})
