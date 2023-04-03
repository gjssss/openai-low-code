import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'uno.css'
import './assets/iconfont.css'

import vDrag from './directives/vDrag'

const app = createApp(App)
const pinia = createPinia()

app.config.productionTip = false

app.use(pinia)
app.use(router)

app.directive('drag', vDrag)

app.mount('#app')
