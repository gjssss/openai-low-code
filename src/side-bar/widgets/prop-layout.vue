<script>
import { defineComponent, h } from 'vue'
export default defineComponent({
  render() {
    let slotList = this.$slots.default ? this.$slots.default() : []
    // 处理slots中所有template（通过另外插槽引入）
    for (let i = 0; i < slotList.length; i++) {
      if (slotList[i].type !== 'div') {
        slotList.splice(i, 1, ...slotList[i].children)
        i--
      }
    }

    return h('div', { class: 'flex flex-row flex-wrap w-full' }, [
      slotList.map((item) => {
        const childrenList = []
        childrenList.push(
          h('div', { class: 'flex-center px-5px w-20%' }, item.children[0])
        )
        if (!item.children[1].props) {
          item.children[1].props = { style: '' }
        }
        item.children[1].props.class += ' w-80%'
        childrenList.push(item.children[1])
        item.props.size = item.props.size ? item.props.size : 24
        return h(
          'div',
          {
            class: `flex flex-row py-4px flex-center`,
            style: `width: ${(item.props.size / 24) * 100}%`,
          },
          childrenList
        )
      }),
    ])
  },
})
</script>
