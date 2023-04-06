<script setup>
import { RouterView } from 'vue-router'
import { register } from '@/lib/utils/register'
register()
</script>

<template>
  <RouterView />
</template>

<style>
:root {
  --border-color: rgba(0, 0, 0, 0.1);
}
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
.select-wapper {
  width: auto;
  display: inline-block;
}
</style>
