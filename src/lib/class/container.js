import { merge } from 'lodash-es'
import { reactive, h, withDirectives, resolveDirective } from 'vue'
import { Base } from './base'

export class Container extends Base {
  constructor(props = {}) {
    super(props)

    // default style
    if (this.name !== '__root__') {
      merge(this.props, {
        style: {
          'border-style': 'solid',
          'border-color': '#000',
          'border-width': '1px',
          padding: '10px',
        },
      })
    }

    this.children = reactive([])
    this.register()
  }
  _render() {
    const drag = resolveDirective('drag')
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
    return h('div', {}, '为什么在这里放点东西呢')
  }

  register() {}
}
