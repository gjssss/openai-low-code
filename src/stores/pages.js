import { Container } from '@/lib'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('pages', {
  state: () => ({
    pageSet: {
      index: {
        root: new Container({
          name: '__root__',
          plant: true,
          style: {
            width: '100%',
            height: '100%',
          },
          wrapper: {
            style: {
              width: '100%',
              height: '100%',
            },
            onClick: () => {},
          },
        }),
        label: 'index',
      },
    },
    _page: 'index',
  }),
  actions: {
    switch(key) {
      if (!this.pageSet[key]) {
        this.newPage(key)
      }
      this._page = key
    },
    newPage(key, label) {
      this.pageSet[key] = {
        root: new Container({
          name: '__root__',
          plant: true,
          style: {
            width: '100%',
            height: '100%',
          },
          wrapper: {
            style: {
              width: '100%',
              height: '100%',
            },
            onClick: () => {},
          },
        }),
        label: label ? label : key,
      }
    },
  },
  getters: {
    currentPage: (state) => {
      return state.pageSet[state._page].root.render()
    },
    currentRoot: (state) => {
      return state.pageSet[state._page].root
    },
    pageList: (state) => {
      return Object.keys(state.pageSet).map((key) => ({
        label: state.pageSet[key].label,
        key,
      }))
    },
  },
})
