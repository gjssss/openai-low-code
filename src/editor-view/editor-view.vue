<template>
  <div id="editor" class="h-editor-view w-full overflow-hidden">
    <rootComponent> </rootComponent>
  </div>
</template>

<script setup>
import { Container } from '../lib'

const root = new Container({
  name: '__root__',
  plant: true,
  style: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    style: {
      width: '100%',
      height: '100%',
    },
    onClick: () => {},
  },
})
const rootComponent = root.render()
</script>
