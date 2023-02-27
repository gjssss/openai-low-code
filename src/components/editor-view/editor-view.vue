<template>
  <div class="h-editor-view w-full">
    <base-component></base-component>
    <buttonComponent></buttonComponent>
  </div>
</template>

<script setup>
import { Base } from '../lib/class/base'
import { Button } from '../lib/class/button'

const base = new Base({
  style: {
    padding: '10px',
    margin: '10px',
    border: '1px solid black',
  },
  onclick: () => {
    base.props.style.padding = '20px'
  },
})
const baseComponent = base.render

const button = new Button(
  {
    style: {
      padding: '10px',
      color: 'blue',
    },
    class: ['trans-all'],
    onclick: () => {
      button.props.type = 'warning'
      button.props.style.padding = '20px'
      button.props.style.color = 'gray'
      button.props.style['margin'] = '10px'
      button.props.class.push('fs-xl')
    },
  },
  { type: 'primary' }
)
const buttonComponent = button.render
</script>
