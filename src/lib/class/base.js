import { reactive, h, computed, ref } from 'vue'
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
  constructor(name = 'base', props = {}) {
    this.props = this.name = name
    this.isRender = false

    this.content = ref('')
    this.id = registerComponent(this)
    this.props = reactive(merge({ class: [], style: {} }, props))
    this.extraProps = reactive({})
    this.settings = reactive({}) // 保存一些组件属性管理上的设置
    this.render = computed(() => {
      if (this.isRender === false) {
        this.isRender = true
      }
      const renderComponent = this._render()()
      renderComponent.props.id = 'com-' + this.id
      return () =>
        h(
          'div',
          {
            onClick: () => {
              selectComponent(this.id)
            },
            class: 'select-wapper',
          },
          renderComponent
        )
    })

    /* 挂载注册函数 */
    this.registerPropGroup = registerPropGroup.bind(this)
    this.registerSelect = registerSelect.bind(this)
    this.registerSwitch = registerSwitch.bind(this)
    this.registerInput = registerInput.bind(this)
  }

  _render() {
    return () => h('div', this.props)
  }

  static get preview() {
    return h('div', {}, 'Base')
  }

  clearStyle() {
    this.props.style = {}
  }
}
