import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    compSet: {},
    count: 0,
    select: 0,
  }),
  actions: {
    push(component) {
      const id = this.count
      this.compSet[id] = component
      this.count++
      return id
    },
    getProp(propName, defaultVal, isStyle) {
      if (isStyle) {
        if (
          defaultVal &&
          this.currentComponent.props.style[propName] === undefined
        ) {
          console.log('set')
          this.currentComponent.props.style[propName] = defaultVal
          return defaultVal
        }
        return this.styles[propName]
      } else {
        if (defaultVal && this.currentComponent.props[propName] === undefined) {
          this.currentComponent.props[propName] = defaultVal
          return defaultVal
        }
        return this.currentComponent.props[propName]
      }
    },
    setProp(propName, value, isStyle) {
      if (isStyle) {
        this.currentComponent.props.style[propName] = value
      } else {
        this.currentComponent.props[propName] = value
      }
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
    styles() {
      const id = this.currentComponent.id
      return window.getComputedStyle(document.getElementById('com-' + id))
    },
  },
})
