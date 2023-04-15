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
        ),
        this.registerInputNumber(
          {
            path: 'props.style.font-size',
            icon: 'iconfont icon-fontsize',
            size: 12,
          },
          {
            default: '14px',
            suffix: 'px',
            min: 0,
          }
        ),
        this.registerInputNumber(
          {
            path: 'props.style.font-weight',
            icon: 'iconfont icon-zitijiacu',
            size: 12,
          },
          {
            default: '400',
            min: 100,
            max: 900,
            step: 100,
          }
        ),
        this.registerColorPicker(
          {
            path: 'props.style.color',
            size: 12,
          },
          {
            default: '#000000FF',
          }
        )
      ),
    ]
  }
}
