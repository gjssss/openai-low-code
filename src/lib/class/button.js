import { h } from 'vue'
import { Base } from './base'
import { NButton } from 'naive-ui'
export class Button extends Base {
  constructor(props = {}) {
    super(props)
    if (Object.hasOwnProperty.call(props, 'content')) {
      this.content.value = props.content
    } else {
      this.content.value = '按钮'
    }
    this.__type__ = 'Button'

    this.register()
  }

  _render() {
    return h(NButton, this.props, () => this.content.value)
  }

  static get preview() {
    return h(NButton, { type: 'default' }, () => '按钮')
  }

  register() {
    this.extraProps['按钮属性'] = [
      this.registerPropGroup(
        { name: '按钮' },
        this.registerSelect(
          { path: 'props.type', icon: '类型', size: 12, isClear: true },
          {
            default: 'default',
            options: [
              'default',
              'tertiary',
              'primary',
              'info',
              'success',
              'warning',
              'error',
            ],
          }
        ),
        this.registerSwitch(
          { path: 'props.circle', icon: '圆角', size: 12, isClear: true },
          {
            default: false,
            on: true,
            off: false,
          }
        ),
        this.registerInput(
          { path: 'content.value', icon: '内容', size: 24 },
          {
            default: '按钮',
          }
        )
      ),
    ]
  }
}
