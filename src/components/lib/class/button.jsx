import { reactive, h } from 'vue'
import { Base } from './base'

export class Button extends Base {
  constructor(props, option) {
    super(props)
    this.option = reactive(option)
    this.props = reactive({ ...this.props, ...this.option })

    this.name = 'button'
  }
  _render() {
    const comp = (props) => h('button', props.props, '按钮')
    return <comp props={this.props}></comp>
  }
  static get preview() {
    return <button>按钮</button>
  }
}
