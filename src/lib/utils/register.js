import baseProps from '@/side-bar/widgets/base-props.vue'
import { useComponentStore } from '@/stores/component'
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
 * 表单属性
 * @typedef {Object} formOption
 * @property {string} name - 属性名
 * @property {string?} icon - icon或名称
 * @property {string?} size - 大小
 */

/**
 * 开关属性类型
 * @typedef {Object} switchOption
 * @property {string|number} default - 默认值
 */

/**
 * 注册一个属性组
 * @param {formOption} formOption
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

/**
 * 注册选择属性
 * @param {formOption} formOption
 * @param {Object} selectOption
 * @param {string|number} selectOption.default - 默认值
 * @param {string[]|number[]} selectOption.options - 可选项
 */
export function registerSelect(formOption, selectOption) {
  // 根据组件要求属性格式转化option
  const _options = []
  for (let i in selectOption.options) {
    _options.push({
      label: selectOption.options[i],
      value: selectOption.options[i],
    })
  }
  // 设置属性默认值
  this.props[formOption.name] = selectOption.default
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
        value: this.props[formOption.name],
        onUpdateValue: (value) => {
          this.props[formOption.name] = value
          this.clearStyle()
          component.updateThenBind()
        },
        options: _options,
      }),
    ])
}

/**
 * 注册选择属性
 * @param {formOption} formOption
 * @param {Object} switchOption
 * @param {boolean} selectOption.default - 默认值
 */
export function registerSwitch(formOption, switchOption) {
  // 设置属性默认值
  this.props[formOption.name] = switchOption.default
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
        value: this.props[formOption.name],
        onUpdateValue: (value) => {
          this.props[formOption.name] = value
          this.clearStyle()
          component.updateThenBind()
        },
      }),
    ])
}

/**
 * 注册文本输入框属性
 * @param {Object} formOption - 表单属性
 * @param {Object} inputOption - 文本输入框属性
 * @param {string|number} inputOption.default - 默认值
 * @param {boolean} inputOption.isContent - 默认值
 */
export function registerInput(formOption, inputOption) {
  if (inputOption.isContent) {
    this.content.value = inputOption.default
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
          value: this.content.value,
          onUpdateValue: (value) => {
            this.content.value = value
          },
        }),
      ])
  } else {
    this.props[formOption.name] = inputOption.default

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
          value: this.props[formOption.name],
          onUpdateValue: (value) => {
            this.props[formOption.name] = value
          },
        }),
      ])
  }
}
