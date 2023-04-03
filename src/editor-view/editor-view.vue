<template>
  <div id="editor" class="h-editor-view w-full overflow-hidden">
    <rootComponent> </rootComponent>
  </div>
</template>

<script setup>
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
root.children.push()
</script>
