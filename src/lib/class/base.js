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
    }

    if (Object.hasOwnProperty.call(props, 'plant')) {
      this.plant = props.plant
      delete props.plant
    } else {
      this.plant = false
    }

    this.wapper = {
      onClick: (event) => {
        event.stopPropagation()
        selectComponent(this.id)
      },
      class: 'select-wapper',
    }
    this.isWapper = true
    if (Object.hasOwnProperty.call(props, 'wapper')) {
      if (typeof props.wapper === 'string' && props.wapper === 'none') {
        this.isWapper = false
      } else if (typeof props.wapper === 'object') {
        merge(this.wapper, props.wapper)
        this._wapper = props.wapper
      }
      delete props.wapper
    }

    this.__type__ = 'Base'
    this.isRender = false
    this.content = ref('')
    this.id = registerComponent(this)
    this.props = reactive(merge({ class: [], style: {} }, props))
    this.props.id = 'com-' + this.id
    this.extraProps = reactive({})
    this.settings = reactive({}) // 保存一些组件属性管理上的设置

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
    return this.isWapper
      ? () => h('div', this.wapper, this._render())
      : this._render()
  }

  static get preview() {
    return h('div', {}, 'Base')
  }

  clearStyle() {
    this.props.style = {}
  }

  // 将对象json化
  jsonify() {
    const props = cloneDeep(toRaw(this.props))
    props.name = cloneDeep(toRaw(this.name))
    props.wapper = cloneDeep(toRaw(this._wapper) ? this._wapper : {})
    props.content = cloneDeep(toRaw(this.content))
    props.__type__ = cloneDeep(toRaw(this.__type__))
    return props
  }
}
