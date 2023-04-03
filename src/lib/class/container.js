import { reactive, h, withDirectives, resolveDirective } from 'vue'
import { Base } from './base'

export class Container extends Base {
  constructor(props = {}) {
    super(props)

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

  static get preview() {
    return h('div', {}, '为什么在这里放点东西呢')
  }

  register() {}
}
