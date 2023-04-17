import { defineStore } from 'pinia'

export const useClipboard = defineStore('clipboard', {
  state: () => ({
    _clipboard: {},
  }),
  actions: {
    copy(type, value) {
      this._clipboard[type] = value
    },
    paste(type) {
      return this._clipboard[type] ? this._clipboard[type] : ''
    },
  },
})
