import { createPinia } from 'pinia'
import { ToastService, Tooltip } from 'primevue'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import '@/assets/styles/main.css'
import '@/assets/styles/tailwind.css'
import initDB from '@/bootstrap/db'
import i18n from '@/i18n'
import { Noir } from '@/themes'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})
app.use(ToastService)
app.directive('tooltip', Tooltip)

initDB().then(() => {
  app.mount('#app')
})
