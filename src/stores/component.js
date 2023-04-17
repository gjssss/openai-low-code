import { Base } from '@/lib/class/base'
import { delComponent } from '@/lib/utils/dom'
import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    compSet: [], // 组件集
    count: 0, // 组件数量
    select: -1, // 当前选中组件id
    _updateFlag: false, // 用于控制属性表单更新
    __root__: null, // 页面根组件
  }),
  actions: {
    /**
     * 将组件注册入组件set
     * @param {Base} component 继承Base类的组件
     * @returns 组件id（唯一）
     */
    push(component) {
      const id = this.count++
      this.compSet[id] = component
      if (component.name === '__root__') {
        this.__root__ = id
      }
      return id
    },
    /**
     * 从id获取组件类
     * @param {String|Number} id 组件id
     * @returns {Base} 组件类实例
     */
    componentFromId(id) {
      if (id instanceof Base) {
        return id
      }
      let _id
      if (Number.isNaN(parseInt(id))) {
        // 格式为`com-0`这种
        _id = parseInt(id.split('-')[1])
      } else {
        _id = parseInt(id)
      }
      return this.compSet[_id]
    },
    /**
     * 属性表单重新绑定
     */
    updateBindProp() {
      this._updateFlag = !this._updateFlag
      this.currentComponent.bindStyle()
    },
    /**
     * 属性表单延迟后重新绑定
     */
    updateThenBind() {
      // TODO: 修复改变组件属性后组件样式绑定问题
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
    /**
     * 删除当前选中组件
     */
    delCurrentComponent() {
      delComponent(this.currentComponent)
      this.compSet.splice(this.select, 1)
      this.select = -1
    },
    /**
     * 清空组件集
     */
    clear() {
      this.compSet.splice(1)
      this.count = 1
      this.select = -1
    },
    /**
     * 获取组件计算样式
     */
    getStyles(component) {
      let id
      if (component instanceof Base) {
        id = component.id
      } else if (typeof component === 'string') {
        id = component.split('-')[1]
      } else if (typeof component === 'number') {
        id = component
      }
      return window.getComputedStyle(document.getElementById('com-' + id))
    },
  },
  getters: {
    /**
     * 获取当前选中组件实例
     */
    currentComponent: (state) => {
      if (state.select < 0 || state.compSet[state.select].name === '__root__') {
        return null
      } else {
        return state.compSet[state.select]
      }
    },
    /**
     * 获取当前选中组件计算样式
     */
    styles: (state) => {
      const id = state.compSet[state.select].id
      return window.getComputedStyle(document.getElementById('com-' + id))
    },
    /**
     * 获取编辑器宽度
     */
    editorWidth: () => {
      return document.getElementById('editor').clientWidth
    },
    /**
     * 获取编辑器高度
     */
    editorHeight: () => {
      return document.getElementById('editor').clientHeight
    },
    /**
     * 获取编辑器宽度
     */
    fatherWidth: (state) => {
      if (state.select < 0 || state.compSet[state.select].name === '__root__') {
        return 0
      } else {
        return document.getElementById(
          'com-' + state.compSet[state.select].father.id
        ).clientWidth
      }
    },
    /**
     * 获取编辑器高度
     */
    fatherHeight: (state) => {
      if (state.select < 0 || state.compSet[state.select].name === '__root__') {
        return 0
      } else {
        return document.getElementById(
          'com-' + state.compSet[state.select].father.id
        ).clientHeight
      }
    },
    /**
     * 获取页面根组件
     */
    root: (state) => {
      return state.compSet[state.__root__]
    },
  },
})
