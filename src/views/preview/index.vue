<template>
  <div w100vw h100vh overflow-hidden>
    <currentPage></currentPage>
  </div>
</template>

<script setup>
import { usePageStore } from '@/stores/pages'
import { storeToRefs } from 'pinia'

const page = usePageStore()
const { currentPage, currentRoot } = storeToRefs(page)
currentRoot.value.props.style.height = window.innerHeight
currentRoot.value.props.style.width = window.innerWidth
</script>

<style></style>
