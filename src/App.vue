<script setup>
import { RouterView } from 'vue-router'
import { register } from '@/lib/utils/register'
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
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-12px {
  font-size: 12px;
}
</style>
