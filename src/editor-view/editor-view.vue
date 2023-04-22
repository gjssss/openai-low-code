<template>
  <div id="editor" class="h-editor-view w-full overflow-hidden">
    <currentPage> </currentPage>
  </div>
</template>

<script setup>
import { useComponentStore } from '@/stores/component'
import { usePageStore } from '@/stores/pages'
import { storeToRefs } from 'pinia'

const component = useComponentStore()
const page = usePageStore()
const { currentPage, currentRoot } = storeToRefs(page)
component.__root__ = currentRoot.id
</script>
