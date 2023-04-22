<template>
  <div class="flex">
    <n-dropdown
      trigger="click"
      :options="pageList"
      :render-option="renderOption"
    >
      <div
        class="page-drop page-name"
        :contenteditable="edit"
        ref="pageName"
        @input="updateName"
      >
        {{ activePage.label }}
      </div>
    </n-dropdown>
    <div
      class="iconfont icon-edit w-30px h-30px flex-center text-20px cursor-pointer hover:c-green trans-all"
      @click="editHandle"
      id="edit-icon"
    />
  </div>
</template>

<script setup>
import { NDropdown } from 'naive-ui'
import { computed, h, ref, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useComponentStore } from '@/stores/component'
import { usePageStore } from '@/stores/pages'
import { storeToRefs } from 'pinia'

const component = useComponentStore()
const page = usePageStore()
const { _page, pageList } = storeToRefs(page)

const edit = ref(false)
const pageName = ref()
// const options = reactive([
//   {
//     label: 'index',
//     key: 'index',
//   },
//   {
//     label: 'user',
//     key: 'user',
//   },
//   {
//     label: 'news',
//     key: 'news',
//   },
//   {
//     label: 'shopping',
//     key: 'shopping',
//   },
//   {
//     label: 'post',
//     key: 'post',
//   },
// ])
const activePage = computed({
  get() {
    return pageList.value.filter((i) => i.key === _page.value)[0]
  },
  set(value) {
    pageList.value.filter((i) => i.key === _page.value)[0].label = value
  },
})
function renderOption(props) {
  if (props.option.key === _page.value) {
    return h(
      'div',
      {
        class: ['page-drop', 'page-drop-item', 'trans-all', 'page-drop-active'],
      },
      props.option.label
    )
  } else {
    return h(
      'div',
      {
        class: ['page-drop', 'page-drop-item', 'trans-all'],
        onClick: () => {
          _page.value = props.option.key
          page.switch(props.option.key)
          component.__root__ = page.currentRoot.id
          window.$message.success(
            '切换页面成功！！当前页面：' + props.option.label
          )
        },
      },
      props.option.label
    )
  }
}
function editHandle() {
  edit.value = true
  nextTick(() => {
    pageName.value.focus()
  })
}
function updateName(e) {
  activePage.value = e.target.innerText
}
function blurHandle(e) {
  if (edit.value && e.target.id !== 'edit-icon') {
    edit.value = false
  }
}
onClickOutside(pageName, blurHandle)
</script>

<style>
.page-name {
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
}
.page-drop {
  width: 250px;
  padding: 2px 10px;
  text-align: center;
}
.page-drop-item {
  margin-top: 2px;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
}
.page-drop-active {
  border: 1px solid green;
  color: green;
}
.page-drop-item:hover {
  border: 1px solid green;
  color: green;
}
</style>
