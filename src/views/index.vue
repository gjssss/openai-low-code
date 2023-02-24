<template>
  <div class="flex">
    <div class="h-screen w-content-screen">
      <div class="bg-red h-top-tab w-full"></div>
      <div class="bg-green h-web-container w-full"></div>
    </div>
    <side-bar></side-bar>
  </div>
</template>

<script setup>
import SideBar from '../components/side-bar/side-bar.vue'
</script>

<style>
.w-sider-bar {
  width: 320px;
}
.w-content-screen {
  width: calc(100vw - 320px);
}
.h-top-tab {
  height: 50px;
}
.h-web-container {
  height: calc(100vh - 50px);
}
</style>
