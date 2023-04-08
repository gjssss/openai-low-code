import baseProps from '@/side-bar/widgets/base-props.vue'
import { useComponentStore } from '@/stores/component'
import { get, set } from 'lodash-es'
import { NSelect, NSwitch, NInput } from 'naive-ui'
import { h } from 'vue'
let component

// 安装store
export function register() {
  component = useComponentStore()
}

// 注册组件
export function registerComponent(componentClass) {
  return component.push(componentClass)
}

// 注册选择事件
export function selectComponent(id) {
  component.select = id
  component.updateBindProp()
}

/**
 * 注册一个属性组
 * @param {formOption} formOption 表单选项
 * @param {string} formOption.name 属性名
 * @param {string?} formOption.icon 属性icon或名称
 * @param {string?} formOption.size 属性表单所占大小
 * @param {...()=>VNode<any>} propFroms
 */
export function registerPropGroup(formOption, ...propFroms) {
  return () =>
    h(
      baseProps,
      { title: formOption.name, icon: formOption.icon },
      {
        default: () => propFroms.map((item) => item()),
      }
    )
}

/**********************注册表单属性*************************/

/**
 * 注册选择属性
 * @param {Object} formOption 表单选项
 * @param {string} formOption.path 属性路径
 * @param {string?} formOption.icon 属性icon或名称
 * @param {string?} formOption.size 属性表单所占大小
 * @param {Boolean?} formOption.isClear 是否重新绑定属性（一般用于组件自带属性）
 * @param {Object} selectOption 选择表单选项
 * @param {string|number} selectOption.default - 默认值
 * @param {string[]|number[]} selectOption.options - 可选项
 * @param {string[]|number[]|null} selectOption.names - 可选项
 */
export function registerSelect(formOption, selectOption) {
  // 根据组件要求属性格式转化option
  const _options = []
  for (let i in selectOption.options) {
    _options.push({
      label: selectOption.names
        ? selectOption.names[i]
        : selectOption.options[i],
      value: selectOption.options[i],
    })
  }
  // 设置属性默认值
  const lastValue = get(this, formOption.path)
  if (lastValue === undefined || lastValue === null) {
    set(this, formOption.path, selectOption.default)
  }
  return () =>
    h('div', { size: formOption.size ? formOption.size : 24 }, [
      h(
        'span',
        {
          class: formOption.icon.includes('icon')
            ? formOption.icon
            : 'text-12px',
        },
        formOption.icon.includes('icon') ? '' : formOption.icon
      ),
      h(NSelect, {
        value: get(this, formOption.path),
        onUpdateValue: (value) => {
          console.log(value)
          set(this, formOption.path, value)
          if (formOption.isClear) {
            this.clearStyle()
            component.updateThenBind()
          }
        },
        options: _options,
      }),
    ])
}

/**
 * 注册选择属性
 * @param {Object} formOption 表单选项
 * @param {string} formOption.path 属性路径
 * @param {string?} formOption.icon 属性icon或名称
 * @param {string?} formOption.size 属性表单所占大小
 * @param {Boolean?} formOption.isClear 是否重新绑定属性（一般用于组件自带属性）
 * @param {Object} switchOption
 * @param {boolean} switchOption.default - 默认值
 * @param {string|number|boolean} switchOption.on - 开启的值
 * @param {string|number|boolean} switchOption.off - 关闭的值
 */
export function registerSwitch(formOption, switchOption) {
  // 设置属性默认值
  const lastValue = get(this, formOption.path)
  if (lastValue === undefined || lastValue === null) {
    set(this, formOption.path, switchOption.default)
  }
  return () =>
    h('div', { size: formOption.size ? formOption.size : 24 }, [
      h(
        'span',
        {
          class: formOption.icon.includes('icon')
            ? formOption.icon
            : 'text-12px',
        },
        formOption.icon.includes('icon') ? '' : formOption.icon
      ),
      h(NSwitch, {
        value: get(this, formOption.path) === switchOption.on,
        onUpdateValue: (value) => {
          set(this, formOption.path, value ? switchOption.on : switchOption.off)
          if (formOption.isClear) {
            this.clearStyle()
            component.updateThenBind()
          }
        },
      }),
    ])
}

/**
 * 注册文本输入框属性
 * @param {Object} formOption 表单选项
 * @param {string?} formOption.path 属性路径
 * @param {string?} formOption.icon 属性icon或名称
 * @param {string?} formOption.size 属性表单所占大小
 * @param {Boolean?} formOption.isClear 是否重新绑定属性（一般用于组件自带属性）
 * @param {Object} inputOption - 文本输入框属性
 * @param {string|number} inputOption.default - 默认值
 */
export function registerInput(formOption, inputOption) {
  const lastValue = get(this, formOption.path)
  if (lastValue === undefined || lastValue === null) {
    set(this, formOption.path, inputOption.default)
  }
  return () =>
    h('div', { size: formOption.size ? formOption.size : 24 }, [
      h(
        'span',
        {
          class: formOption.icon.includes('icon')
            ? formOption.icon
            : 'text-12px',
        },
        formOption.icon.includes('icon') ? '' : formOption.icon
      ),
      h(NInput, {
        value: get(this, formOption.path),
        onUpdateValue: (value) => {
          set(this, formOption.path, value)
          if (formOption.isClear) {
            this.clearStyle()
            component.updateThenBind()
          }
        },
      }),
    ])
}
