<template>
  <div id="component" class="p-20px" v-drag="dragOption">
    <btn name="Button"></btn>
    <container name="Container"></container>
  </div>
</template>

<script setup>
import { useComponentStore } from '@/stores/component'
import { Button } from '../lib/class/button'
import { Container } from '../lib/class/container'

const btn = Button.preview
const container = Container.preview
const component = useComponentStore()
const componentMap = {
  Button,
  Container,
}

const dragOption = {
  group: {
    name: 'editor',
    pull: 'clone',
    put: false,
  },
  animation: 150,
  sort: false,
  onEnd: function (e) {
    const instance = component.componentFromId(e.to.id)
    if (instance) {
      const newComponent = Reflect.construct(
        componentMap[e.item.getAttribute('name')],
        [{ name: e.item.getAttribute('name'), class: ['trans-all'] }]
      )
      instance.addChildren(e.newIndex, newComponent.render())
      document.getElementById(e.to.id).removeChild(e.item)
    }
  },
}
</script>

<style></style>
