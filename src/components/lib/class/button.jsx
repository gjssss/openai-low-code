import { reactive, h } from 'vue'
import { Base } from './base'
import { NButton } from 'naive-ui'
export class Button extends Base {
  constructor(name, props, option) {
    super(name, props)
    this.option = reactive(option)
    this.props = reactive({ ...this.props, ...this.option })
  }
  _render() {
    const comp = (props) => h(NButton, props.props, '按钮')
    return <comp props={this.props}></comp>
  }
  static get preview() {
    return <Button>按钮</Button>
  }
}
