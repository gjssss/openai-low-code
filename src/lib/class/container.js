import { useComponentStore } from '@/stores/component'
import { merge } from 'lodash-es'
import { reactive, h, withDirectives, resolveDirective } from 'vue'
import { Base } from './base'

export class Container extends Base {
  constructor(props = {}) {
    super(props)
    this.__type__ = 'Container'

    // default style
    if (!this.plant) {
      merge(this.props, {
        style: {
          'border-style': 'solid',
          'border-color': '#000',
          'border-width': '1px',
          padding: '30px',
        },
      })
    }

    this.children = reactive([])
    this.register()
  }
  _render() {
    const drag = resolveDirective('drag')
    const component = useComponentStore()
    return withDirectives(
      h(
        'div',
        this.props,
        this.children.map((i) => i.render()())
      ),
      [
        [
          drag,
          {
            group: 'editor',
            animation: 150,
            onEnd: (e) => {
              const lastID = e.from.id
              const nextID = e.to.id
              const lastInstance = component.componentFromId(lastID)
              const nextInstance = component.componentFromId(nextID)
              // 将组件从旧的里面拿出来放到新的容器里面
              const { oldIndex, newIndex } = e
              const child = lastInstance.children.splice(oldIndex, 1)[0]
              if (lastInstance !== nextInstance) {
                child.father = nextInstance
              }
              nextInstance.children.splice(newIndex, 0, child)
            },
          },
        ],
      ]
    )
  }
  addChildren(index, child) {
    if (index > this.children.length) {
      this.children.push(child)
    } else {
      this.children.splice(index, 0, child)
    }
  }

  static get preview() {
    return h(
      'div',
      {
        style: {
          'border-style': 'solid',
          'border-color': '#000',
          'border-width': '1px',
          padding: '30px',
        },
        class: 'select-wrapper',
      },
      ''
    )
  }

  register() {
    this.extraProps['容器属性'] = [
      this.registerPropGroup(
        {
          name: 'Flex布局',
        },
        [
          this.registerSwitch(
            {
              path: 'props.style.display',
              icon: 'Flex',
              size: 12,
            },
            {
              default: 'block',
              on: 'flex',
              off: 'block',
            }
          ),
          this.registerSelect(
            {
              path: 'props.style.flex-direction',
              icon: '方向',
              size: 12,
            },
            {
              default: 'row',
              options: ['row', 'column', 'column-reverse', 'row-reverse'],
              names: ['横向', '纵向', '纵向反向', '横向反向'],
            }
          ),
          this.registerSelect(
            {
              path: 'props.style.justify-content',
              icon: '主轴',
              size: 12,
            },
            {
              default: 'start',
              options: [
                'start',
                'end',
                'center',
                'space-between',
                'space-around',
                'space-evenly',
              ],
              names: [
                '起始对齐',
                '末尾对齐',
                '中心对齐',
                '均匀分配',
                'around',
                'evenly',
              ],
            }
          ),
          this.registerSelect(
            {
              path: 'props.style.align-items',
              icon: '副轴',
              size: 12,
            },
            {
              default: 'start',
              options: [
                'start',
                'end',
                'center',
                'space-between',
                'space-around',
                'space-evenly',
              ],
              names: [
                '起始对齐',
                '末尾对齐',
                '中心对齐',
                '均匀分配',
                'around',
                'evenly',
              ],
            }
          ),
        ]
      ),
    ]
  }

  jsonify() {
    const props = super.jsonify()
    props.children = this.children.map((i) => i.jsonify())
    return props
  }
}
