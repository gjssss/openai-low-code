<script setup>
import { RouterView } from 'vue-router'
import { register } from './components/lib/utils/register'
register()
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
