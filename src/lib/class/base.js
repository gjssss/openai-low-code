import { reactive, h, ref, toRaw } from 'vue'
import {
  registerComponent,
  selectComponent,
  registerSelect,
  registerPropGroup,
  registerSwitch,
  registerInput,
} from '../utils/register'
import { cloneDeep, merge } from 'lodash-es'
export class Base {
  constructor(props = {}) {
    if (Object.hasOwnProperty.call(props, 'name')) {
      this.name = props.name
      delete props.name
    } else {
      this.name = 'component'
    }

    if (Object.hasOwnProperty.call(props, 'plant')) {
      this.plant = props.plant
      delete props.plant
    } else {
      this.plant = false
    }

    if (Object.hasOwnProperty.call(props, 'father')) {
      this.father = props.father
      delete props.father
    } else {
      this.father = this
    }

    this.id = registerComponent(this)

    this.wrapper = {
      onClick: (event) => {
        event.stopPropagation()
        selectComponent(this.id)
      },
      class: 'select-wrapper',
      key: this.id,
    }
    this.isWrapper = true
    if (Object.hasOwnProperty.call(props, 'wrapper')) {
      if (typeof props.wrapper === 'string' && props.wrapper === 'none') {
        this.isWrapper = false
      } else if (typeof props.wrapper === 'object') {
        merge(this.wrapper, props.wrapper)
        this._wrapper = props.wrapper
      }
      delete props.wrapper
    }

    this.props = reactive(merge({ class: [], style: {} }, props))
    this.extraProps = reactive({})
    this.settings = reactive({}) // 保存一些组件属性管理上的设置

    this.props.id = 'com-' + this.id
    this.content = ref(props.content)
    delete props.content
    this.__type__ = 'Base'
    this.isRender = false

    /* 挂载注册函数 */
    this.registerPropGroup = registerPropGroup.bind(this)
    this.registerSelect = registerSelect.bind(this)
    this.registerSwitch = registerSwitch.bind(this)
    this.registerInput = registerInput.bind(this)
  }

  _render() {
    return h('div', this.props)
  }

  render() {
    if (this.isRender === false) {
      this.isRender = true
    }
    return this.isWrapper
      ? () => h('div', this.wrapper, this._render())
      : this._render()
  }

  static get preview() {
    return h('div', {}, 'Base')
  }

  register() {}

  clearStyle() {
    this.props.style = {}
  }

  // 将对象json化
  jsonify() {
    const props = cloneDeep(toRaw(this.props))
    props.name = cloneDeep(toRaw(this.name))
    props.wrapper = cloneDeep(toRaw(this._wrapper) ? this._wrapper : {})
    props.content = cloneDeep(toRaw(this.content))
    props.__type__ = cloneDeep(toRaw(this.__type__))
    delete props.id
    return props
  }
}
