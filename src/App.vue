<script setup>
import { RouterView } from 'vue-router'
import { register } from '@/lib/utils/register'
import { saveRegister } from '@/lib/utils/save'
import { NMessageProvider, NNotificationProvider } from 'naive-ui'
if (!localStorage.getItem('page-1')) {
  localStorage.setItem(
    'page-1',
    '[{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 0px 0px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"row","justify-content":"center","align-items":"center","width":"1280px","height":"799px"},"name":"页面","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"1px 1px 1px 1px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"row","justify-content":"start","align-items":"start","width":"400px","height":"500px","box-sizing":"content-box","border-radius":"20px 20px 20px 20px","overflow":"hidden"},"name":"表格","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 1px 0px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"column","justify-content":"start","align-items":"start","width":"150px","box-sizing":"border-box","height":"500px","background-color":"#FFFAEDFF"},"name":"左边","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 0px 1px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"row","justify-content":"center","align-items":"center","width":"150px","height":"50px"},"name":"左边表头","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"font-size":"20px","font-weight":"700","color":"#000000FF"},"content":"姓名","name":"姓名","wrapper":{},"__type__":"Text"}]},{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 0px 1px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"row","justify-content":"center","align-items":"center","width":"150px","height":"30px"},"name":"左表1","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"font-size":"14px","font-weight":"400","color":"#000000FF"},"content":"王小飞","name":"Text","wrapper":{},"__type__":"Text"}]}]},{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 0px 0px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"column","justify-content":"start","align-items":"start","width":"250px","height":"500px","box-sizing":"border-box","background-color":"#EDFEFFFF"},"name":"右边","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 0px 1px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"row","justify-content":"center","align-items":"center","width":"250px","height":"50px"},"name":"右表头","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"font-size":"20px","font-weight":"700","color":"#000000FF"},"content":"电话","name":"电话","wrapper":{},"__type__":"Text"}]},{"class":["trans-all"],"style":{"border-style":"solid","border-color":"#000","border-width":"0px 0px 1px 0px","padding":"0px 0px 0px 0px","display":"flex","flex-direction":"row","justify-content":"center","align-items":"center","width":"250px","height":"30px"},"name":"右表1","wrapper":{},"__type__":"Container","children":[{"class":["trans-all"],"style":{"font-size":"14px","font-weight":"400","color":"#000000FF"},"content":"13579866700","name":"Text","wrapper":{},"__type__":"Text"}]}]}]}]}]'
  )
}
register()
saveRegister()
</script>

<template>
  <NMessageProvider>
    <n-notification-provider :max="1">
      <RouterView />
    </n-notification-provider>
  </NMessageProvider>
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
.select-wrapper {
  width: auto;
  display: inline-block;
}
</style>
