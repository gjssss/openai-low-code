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

let instance = null

const dragOption = {
  group: {
    name: 'eidtor',
    pull: 'clone',
    put: false,
  },
  animation: 150,
  sort: false,
  onClone: function (evt) {
    let className = evt.item.attributes.name.value
    instance = eval(`new ${className}`)
    // console.log(createVNode(instance.render()))
  },
  onEnd: function (e) {
    console.log(e.item)
  },
}
</script>

<style></style>
