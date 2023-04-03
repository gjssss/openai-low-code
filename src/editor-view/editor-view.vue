<template>
  <div id="eidtor" class="h-editor-view w-full overflow-hidden">
    <div class="overflow-y-auto w-full h-full">
      <base-component />
      <container-component />
    </div>
  </div>
</template>

<script setup>
import { Base } from '../lib/class/base'
import { Button } from '../lib/class/button'
import { Container } from '../lib/class/container'
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
const baseComponent = base.render()

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
container.children.push(button.render())
const containerComponent = container.render()
</script>
