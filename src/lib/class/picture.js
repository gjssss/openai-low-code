import { h } from 'vue'
import { NImage } from 'naive-ui'
import { Base } from './base'

export class Picture extends Base {
  constructor(props = {}) {
    super(props)
    this.__type__ = 'Picture'

    this.register()
  }

  _render() {
    return h(NImage, this.props)
  }

  static get preview() {
    return h(NImage, {
      src: '/empty.svg',
      style: {
        width: '60px',
        height: '60px',
        'justify-content': 'center',
        display: 'flex',
      },
    })
  }

  register() {
    super.register()
    this.extraProps['图片属性'] = [
      this.registerPropGroup(
        { name: '图片' },
        this.registerInput(
          { path: 'props.alt', icon: '说明', size: 24 },
          {
            default: '图片',
          }
        ),
        this.registerInput(
          { path: 'props.src', icon: '来源', size: 24 },
          {
            default: '请输入图片链接',
          }
        ),
        this.registerSelect(
          {
            path: 'props.object-fit',
            icon: '适应类型',
            size: 12,
          },
          {
            default: 'cover',
            options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            names: ['填充', '包含', '覆盖', '无', '按比例'],
          }
        ),
        this.registerSwitch(
          {
            path: 'props.preview-disabled',
            icon: '禁用预览',
            size: 12,
          },
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
