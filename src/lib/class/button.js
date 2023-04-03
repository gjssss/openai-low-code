import { h } from 'vue'
import { Base } from './base'
import { NButton } from 'naive-ui'
export class Button extends Base {
  constructor(props = {}) {
    super(props)

    this.extraProps['按钮属性'] = []
    this.register()
  }

  _render() {
    return h(NButton, this.props, () => this.content.value)
  }

  static get preview() {
    return h(NButton, { type: 'default' }, () => '按钮')
  }

  register() {
    this.extraProps['按钮属性'].push(
      this.registerPropGroup(
        { name: '按钮' },
        this.registerSelect(
          { name: 'type', icon: '类型', size: 12 },
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
          { name: 'circle', icon: '圆角', size: 12 },
          {
            default: false,
          }
        ),
        this.registerInput(
          { name: 'circle', icon: '内容', size: 24 },
          {
            default: '按钮',
            isContent: true,
          }
        )
      )
    )
  }
}
