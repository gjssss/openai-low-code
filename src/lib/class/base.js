import { reactive, h, ref, toRaw, watch } from 'vue'
import {
  registerComponent,
  selectComponent,
  registerSelect,
  registerPropGroup,
  registerSwitch,
  registerInput,
  registerColorPicker,
  registerInputNumber,
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

    this.props = reactive(merge({ class: {}, style: {} }, props))
    this.extraProps = reactive({})
    this.settings = reactive({}) // 保存一些组件属性管理上的设置

    this.props.id = 'com-' + this.id
    this.content = ref(props.content)
    delete props.content
    this.__type__ = 'Base'
    this.isRender = false

    watch(
      () => this.settings['size-more'],
      (newVal) => {
        if (newVal) {
          this.sizeWatchHeightHandel = watch(
            () => this.father.props.style.height,
            (_new) => {
              this.props.style.height =
                Math.floor(
                  (this.settings['height-percent'] * parseInt(_new)) / 100
                ) + 'px'
            }
          )
          this.sizeWatchWidthHandel = watch(
            () => this.father.props.style.width,
            (_new) => {
              this.props.style.width =
                Math.floor(
                  (this.settings['width-percent'] * parseInt(_new)) / 100
                ) + 'px'
            }
          )
        } else {
          this.sizeWatchHeightHandel ? this.sizeWatchHeightHandel() : null
          this.sizeWatchWidthHandel ? this.sizeWatchWidthHandel() : null
        }
      }
    )

    /* 挂载注册函数 */
    this.registerPropGroup = registerPropGroup.bind(this)
    this.registerSelect = registerSelect.bind(this)
    this.registerSwitch = registerSwitch.bind(this)
    this.registerInput = registerInput.bind(this)
    this.registerColorPicker = registerColorPicker.bind(this)
    this.registerInputNumber = registerInputNumber.bind(this)
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
    return h('div', { class: 'select-wrapper' }, 'Base')
  }

  register() {}

  bindStyle() {
    return window.getComputedStyle(document.getElementById('com-' + this.id))
  }

  clearStyle() {
    this.props.style = {}
  }

  // 将对象json化
  jsonify() {
    const props = cloneDeep(toRaw(this.props))
    props.name = cloneDeep(toRaw(this.name))
    props.wrapper = cloneDeep(toRaw(this._wrapper) ? this._wrapper : {})
    props.content = cloneDeep(toRaw(this.content))
    props.settings = cloneDeep(toRaw(this.settings))
    props.__type__ = cloneDeep(toRaw(this.__type__))
    delete props.id
    return props
  }
}
