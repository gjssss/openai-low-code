import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    compSet: {},
    count: 0,
    select: 0,
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
    /**
     * 获取组件某属性的值
     * @param {String} propName 属性名称
     * @param {String|Boolean} defaultVal 属性默认值，当为`false`时采取组件自带的值
     * @param {Boolean} isStyle 是否是样式元素
     * @returns 当前属性的值
     */
    getProp(propName, defaultVal, isStyle) {
      if (isStyle) {
        // default 为 false 就先设置一下显示的默认的样式
        if (!defaultVal) {
          defaultVal = this.styles[propName]
        }
        // 要是没定义就先搞到对象里
        if (this.currentComponent.props.style[propName] === undefined) {
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
    /**
     * 设置组件属性值
     * @param {String} propName 属性名称
     * @param {String} value 属性值
     * @param {Boolean} isStyle 是否是表单元素
     */
    setProp(propName, value, isStyle) {
      if (isStyle) {
        console.log(value)
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
