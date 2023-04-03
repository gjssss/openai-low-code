import { reactive, h, ref } from 'vue'
import {
  registerComponent,
  selectComponent,
  registerSelect,
  registerPropGroup,
  registerSwitch,
  registerInput,
} from '../utils/register'
import { merge } from 'lodash-es'
export class Base {
  constructor(props = {}) {
    if (Object.hasOwnProperty.call(props, 'name')) {
      this.name = props.name
      delete props.name
    }
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
    return () =>
      h(
        'div',
        {
          onClick: (event) => {
            event.stopPropagation()
            selectComponent(this.id)
          },
          class: 'select-wapper',
        },
        this._render()
      )
  }

  static get preview() {
    return h('div', {}, 'Base')
  }

  clearStyle() {
    this.props.style = {}
  }
}
