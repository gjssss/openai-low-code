import Sortable from 'sortablejs'
export default {
  mounted: (el, binding) => {
    const value = binding.value ? binding.value : {}
    new Sortable(el, value)
  },
}
