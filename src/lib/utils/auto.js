import { useComponentStore } from '@/stores/component'
import { get, set } from 'lodash-es'

export function process(config) {
  const component = useComponentStore()
  const instance = component.compSet.filter((i) => {
    if (i.name === '__root__') {
      return false
    }
    return config.filterProps.reduce(
      (sum, item) => sum && i[item.prop] === item.value,
      true
    )
  })[0]
  config.handles.forEach((i) => {
    let value = get(instance, i.path)
    if (value === undefined) {
      if (i.path.indexOf('style') >= 0) {
        value = getComputedStyle(document.getElementById('com-' + instance.id))[
          i.path.split('.').pop()
        ]
      } else {
        console.warn('parse prop error')
      }
    }
    const handle = eval(i.valueHandle)
    console.log(i.path, value, handle(value))
    set(instance, i.path, handle(value))
    console.log(instance)
  })
}
