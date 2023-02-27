import { reactive, h, computed } from 'vue'
import { registerComponent, selectComponent } from '../utils/register'

import { NInput } from 'naive-ui'

export class Base {
  constructor(props) {
    this.id = registerComponent(this)
    this.props = reactive(props)
    this.render = computed(() => {
      return h(
        'div',
        {
          onClick: () => {
            selectComponent(this.id)
          },
          class: 'select-wapper',
        },
        this._render()
      )
    })

    this.name = 'Base'
  }

  show() {
    const _this = this
    const comp = (props) =>
      h(NInput, {
        value: props.value,
        onInput: (target) => {
          _this.props.style.padding = target
        },
      })
    return <comp value={this.props.style.padding}></comp>
  }
  _render() {
    const comp = (props) => h('div', props.props)
    return <comp props={this.props}></comp>
  }

  static get preview() {
    return <div>Base</div>
  }
}
