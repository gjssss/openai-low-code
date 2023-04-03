<template>
  <div id="editor" class="h-editor-view w-full overflow-hidden">
    <rootComponent> </rootComponent>
  </div>
</template>

<script setup>
import { Base } from '../lib/class/base'
import { Button } from '../lib/class/button'
import { Container } from '../lib/class/container'

const root = new Container({
  name: '__root__',
  style: {
    width: '100%',
    height: '100%',
  },
  wapper: {
    style: {
      width: '100%',
      height: '100%',
    },
    onClick: () => {},
  },
})
const rootComponent = root.render()

const base = new Base({
  name: '这是一个基类',
  style: {
    padding: '10px',
    'border-style': 'solid',
    'border-color': '#000',
    'border-width': '1px',
  },
  class: ['trans-all', 'w-20px'],
})
const button = new Button({
  name: '这是一个按钮',
  class: ['trans-all'],
})
const container = new Container({
  name: '容器',
  style: {
    padding: '20px',
    background: 'green',
  },
})
const baseComponent = base.render()
const containerComponent = container.render()
container.children.push(button.render())
root.children.push(baseComponent, containerComponent)
</script>
