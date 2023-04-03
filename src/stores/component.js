import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    compSet: {},
    count: 0,
    select: 0,
    _updateFlag: false, // 用于控制属性表单更新
  }),
  actions: {
    /**
     * 将组件注册入组件set
     * @param {Base} component 继承Base类的组件
     * @returns 组件id（唯一）
     */
    push(component) {
      const id = this.count
      this.compSet[id] = component
      this.count++
      return id
    },
    // 属性表单重新绑定
    updateBindProp() {
      this._updateFlag = !this._updateFlag
    },
    updateThenBind() {
      // 对于改变组件属性后，其样式不会立马改变（nextTick也不行），目前就想到这个方法
      setTimeout(() => {
        this.updateBindProp()
      }, 300)
    },
    /**
     * 获取组件某属性的值
     * @param {String} propName 属性名称
     * @param {String|Boolean} defaultVal 属性默认值，当为`false`时采取组件自带的值
     * @param {Boolean} isStyle 是否是样式元素
     * @returns 当前属性的值
     */
    getProp(propName, defaultVal, isStyle) {
      if (isStyle) {
        return defaultVal ? defaultVal : this.styles[propName]
      } else {
        if (defaultVal && this.currentComponent.props[propName] === undefined) {
          this.currentComponent.props[propName] = defaultVal
          return defaultVal
        }
        return this.currentComponent.props[propName]
      }
    },
    /**
     * 设置组件属性值
     * @param {String} propName 属性名称
     * @param {String} value 属性值
     * @param {Boolean} isStyle 是否是样式元素
     */
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
    editorWidth() {
      return document.getElementById('eidtor').clientWidth
    },
    editorHeight() {
      return document.getElementById('eidtor').clientHeight
    },
  },
})
