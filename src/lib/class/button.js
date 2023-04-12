import { h } from 'vue'
import { Text } from './text'
import { NButton } from 'naive-ui'
export class Button extends Text {
  constructor(props = {}) {
    if (!Object.hasOwnProperty.call(props, 'content')) {
      props.content = '按钮'
    }
    super(props)
    this.__type__ = 'Button'

    this.register()
  }

  _render() {
    return h(NButton, this.props, () => super._render())
  }

  static get preview() {
    return h(NButton, { type: 'default' }, () => '按钮')
  }

  register() {
    super.register()
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
        )
      ),
    ]
  }
}
