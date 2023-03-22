<template>
  <div class="h-editor-view w-full overflow-hidden">
    <div class="overflow-y-auto w-full h-full">
      <base-component></base-component> <buttonComponent></buttonComponent>
    </div>
  </div>
</template>

<script setup>
import { Base } from '../lib/class/base'
import { Button } from '../lib/class/button'

const base = new Base('这是一个基类', {
  style: {
    padding: '10px',
    'border-style': 'solid',
    'border-color': '#000',
    'border-width': '1px',
  },
  class: ['trans-all', 'w-20px'],
})
const baseComponent = base.render

const button = new Button(
  '这是一个按钮',
  {
    class: ['trans-all'],
  },
  { type: 'primary' }
)
const buttonComponent = button.render
</script>
