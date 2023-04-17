<template>
  <div>
    <ul>
      <li class="help-item">
        左侧为编辑器，右侧为侧边栏。侧边栏中有<code>属性</code>和<code>组件</code>可以点击。
      </li>
      <li class="help-item">
        可以把<code>组件</code>内的小组件拖拽到编辑器中合适的位置，也可以把编辑器中的组件拖拽到其他位置上。
      </li>
      <li class="help-item">
        点击编辑器内可以点击组件来选中，选中后可以在<code>属性</code>中编辑其属性值。
      </li>
      <li class="help-item">
        选中组件不仅可以在编辑器中点击，还可以点击左上角来打开组件目录
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style>
.help-item {
  padding-left: 1em;
  margin-bottom: 0.5em;
  list-style: none;
}
.help-item::before {
  content: '⭐️ ';
}
.help-item code {
  background-color: #f6f8fa;
  padding: 0.5em;
  margin: 0 0.5em;
  font-size: 0.5em;
}
</style>
