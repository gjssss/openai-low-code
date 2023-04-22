<template>
  <div class="flex">
    <div class="h-screen w-content-screen">
      <div class="h-top-tab w-full shadow-md flex items-center px-20px">
        <n-menu
          mode="horizontal"
          :value="null"
          :render-label="renderLabel"
          :options="menuOpt"
        />
        <pageSelector></pageSelector>
      </div>
      <editor-view></editor-view>
    </div>
    <side-bar></side-bar>
    <n-modal v-model:show="showGPT">
      <n-card
        style="width: 600px"
        title="阿木🤖"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-input
          placeholder="请输入命令"
          v-model:value="question"
          :loading="loading"
        />
        <n-button
          class="mt-10px"
          :type="loading ? 'primary' : 'default'"
          :loading="loading"
          @click="runHandle"
          >执行</n-button
        >
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import SideBar from '@/side-bar/side-bar.vue'
import editorView from '@/editor-view/editor-view.vue'
import {
  useMessage,
  useNotification,
  NMenu,
  NModal,
  NCard,
  NInput,
  NButton,
} from 'naive-ui'
import { h, computed, ref } from 'vue'
import { savePage, loadPage } from '@/lib/utils/save'
import { process } from '@/lib/utils/auto'
import { selectComponent } from '@/lib/utils/register'
import { Container } from '@/lib'
import { showComponentHelp } from '@/utils/help'
import { useComponentStore } from '@/stores/component'
import { ask } from '@/utils/chatGPT'
import pageSelector from './page-selector.vue'
import { usePageStore } from '@/stores/pages'

const component = useComponentStore()
const page = usePageStore()
const showGPT = ref(false)
const question = ref('')
const loading = ref(false)
window.component = component

function _map(child) {
  const prop = {
    label: child.name,
    key: child.id,
    callBack: () => {
      selectComponent(child.id)
    },
  }
  if (component.currentComponent === child) {
    prop.label += '👈'
    prop.flag = true
  } else {
    prop.flag = false
  }
  if (child instanceof Container) {
    prop.children = child.children.map(_map)
    if (prop.children.reduce((sum, val) => sum | val.flag, false)) {
      prop.label += '👉'
      prop.flag = true
    }
  }
  return prop
}

const menuOpt = computed(() => [
  {
    label: component.currentComponent
      ? '当前组件：' + component.currentComponent.name + '👈'
      : '没有选中组件🤷‍♂️',
    key: 'component',
    children: component.root ? component.root.children.map(_map) : [],
  },
  {
    label: '页面选项📄',
    key: 'page',
    children: [
      {
        label: '保存页面💾',
        key: 'savePage',
        callBack: savePage,
      },
      {
        label: '加载页面🖊',
        key: 'loadPage',
        callBack: () => {
          component.clear()
          loadPage()
        },
      },
      {
        label: '新建页面',
        key: 'newPage',
        callBack: () => {
          const key = 'page' + Object.keys(page.pageSet).length
          page.newPage(key)
          window.$message.success('新建页面成功！！新建页面：' + key)
        },
      },
    ],
  },
  {
    label: '帮助🎓',
    key: 'help',
    children: [
      {
        label: '组件帮助🤓',
        key: 'helpComponent',
        callBack: showComponentHelp,
      },
    ],
  },
  {
    label: 'GPT🤖',
    key: 'gpt',
    children: [
      {
        label: '助理机器人',
        key: 'robot',
        callBack: () => (showGPT.value = true),
      },
    ],
  },
])

function renderLabel(opt) {
  const props = { class: 'menu-item' }
  if (Object.hasOwnProperty.call(opt, 'callBack')) {
    props.onClick = opt.callBack
  }
  return h('div', props, opt.label)
}

function runHandle() {
  loading.value = true
  ask(question.value).then((d) => {
    process(d)
    loading.value = false
  })
}

window.$message = useMessage()
window.$notification = useNotification()
</script>

<style>
.w-sider-bar {
  width: 320px;
}
.w-content-screen {
  width: calc(100vw - 320px);
}
.h-top-tab {
  height: 40px;
}
.h-editor-view {
  height: calc(100vh - 40px);
}
.menu-item {
  font-size: 12px;
}
</style>
