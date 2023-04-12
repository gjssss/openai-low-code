import { h } from 'vue'
import { Base } from './base'

export class Text extends Base {
  constructor(props = {}) {
    if (!Object.hasOwnProperty.call(props, 'content')) {
      props.content = '文本'
    }
    super(props)
    this.__type__ = 'Text'

    this.register()
  }

  _render() {
    return h('div', this.props, this.content)
  }

  static get preview() {
    return h('div', {}, '文本')
  }

  register() {
    super.register()
    this.extraProps['文本属性'] = [
      this.registerPropGroup(
        { name: '文本' },
        this.registerInput(
          { path: 'content.value', icon: '内容', size: 24 },
          {
            default: '文本',
          }
        )
      ),
    ]
  }
}
