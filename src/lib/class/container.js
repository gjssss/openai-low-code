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
        this.children.map((i) => i())
      ),
      [
        [
          drag,
          {
            group: 'editor',
            animation: 150,
            onEnd: function (e) {
              // 获得拖拽组件id和实例
              const lastID = e.from.id
              const nextID = e.to.id
              const lastInstance = component.componentFromId(lastID)
              const nextInstance = component.componentFromId(nextID)

              // 将组件从旧的里面拿出来放到新的容器里面
              const { oldIndex, newIndex } = e
              nextInstance.children.splice(
                newIndex,
                0,
                ...lastInstance.children.splice(oldIndex, 1)
              )
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
          display: 'inline-block',
        },
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
        )
      ),
    ]
  }

  jsonify() {
    const props = super.jsonify()
    props.children = []
    for (let i in this.children) {
      const child = this.children[i]().children[0]
      const component = useComponentStore()
      const childInstance = component.componentFromId(child.props.id)
      props.children.push(childInstance.jsonify())
    }
    return props
  }
}
