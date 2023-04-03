<template>
  <div id="component" class="p-20px" v-drag="dragOption">
    <base-component name="Base"></base-component>
    <btn name="Button"></btn>
    <container name="Container"></container>
  </div>
</template>

<script setup>
import { Base } from '../lib/class/base'
import { Button } from '../lib/class/button'
import { Container } from '../lib/class/container'

const baseComponent = Base.preview
const btn = Button.preview
const container = Container.preview

const dragOption = {
  group: {
    name: 'editor',
    pull: 'clone',
    put: false,
  },
  animation: 150,
  sort: false,
  onEnd: function (e) {
    console.log(e.to.id)
  },
}
</script>

<style></style>
