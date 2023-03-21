import { reactive, h, computed } from 'vue'
import { func } from '../utils/createProps'
import { registerComponent, selectComponent } from '../utils/register'

export class Base {
  constructor(name, props) {
    this.id = registerComponent(this)
    this.props = reactive(props)
    this.render = computed(() => {
      if (this.isRender === false) {
        this.isRender = true
      }
      const renderComponent = this._render()
      renderComponent.props.props.id = 'com-' + this.id
      return h(
        'div',
        {
          onClick: () => {
            selectComponent(this.id)
          },
          class: 'select-wapper',
        },
        renderComponent
      )
    })
    this.isRender = false
    this.name = name
    this.settings = reactive({}) // 保存一些组件属性管理上的设置
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
