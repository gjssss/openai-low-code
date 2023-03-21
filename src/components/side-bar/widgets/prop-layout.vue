<script>
import { defineComponent, h } from 'vue'
export default defineComponent({
  render() {
    const slotList = this.$slots.default ? this.$slots.default() : []
    console.log(slotList[0].children)
    return h('div', { class: 'flex flex-row flex-wrap w-full' }, [
      slotList.map((item) => {
        const childrenList = []
        item.children[0].props.class += ' iconfont text-18px'
        childrenList.push(
          h(
            'div',
            { class: 'flex-center px-5px', style: 'width: 20%;' },
            item.children[0]
          )
        )
        item.children[1].props.style += 'width: 80%'
        childrenList.push(item.children[1])
        item.props.size = item.props.size ? item.props.size : 24
        return h(
          'div',
          {
            class: `flex flex-row py-2px`,
            style: `width: ${(item.props.size / 24) * 100}%`,
          },
          childrenList
        )
      }),
    ])
  },
})
</script>

<style></style>
