import { rgbaToHex } from '@/utils/color'
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
    return h('div', { class: 'select-wrapper' }, '文本')
  }

  register() {
    super.register()
    this.extraProps['文本属性'] = [
      this.registerPropGroup({ name: '文本' }, [
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
        ),
        this.registerSwitch(
          {
            path: 'props.style.text-decoration',
            icon: 'iconfont icon-zitixiahuaxian',
            size: 12,
          },
          {
            default: 'none',
            on: 'underline',
            off: 'none',
          }
        ),
        this.registerSwitch(
          {
            path: 'props.style.font-style',
            icon: 'iconfont icon-zitixieti',
            size: 12,
          },
          {
            default: 'normal',
            on: 'italic',
            off: 'normal',
          }
        ),
      ]),
    ]
  }

  bindStyle() {
    const styles = super.bindStyle()
    this.props.style['font-size'] = styles['font-size']
    this.props.style['font-weight'] = styles['font-weight']
    this.props.style['color'] = rgbaToHex(styles['color'])
  }
}
