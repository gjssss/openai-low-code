import { reactive, h, computed } from 'vue'
import { func } from '../utils/createProps'
import { registerComponent, selectComponent } from '../utils/register'

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

    this.show = {
      type: 'input',
      name: 'padding',
      isStyle: true,
    }
    func.bind(this.constructor)
  }

  _render() {
    const comp = (props) => h('div', props.props)
    return <comp props={this.props}></comp>
  }

  static get preview() {
    return <div>Base</div>
  }
}
