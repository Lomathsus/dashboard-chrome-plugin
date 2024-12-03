import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import '@/assets/styles/main.css'
import '@/assets/styles/tailwind.css'
import initDB from '@/bootstrap/db'
import { Noir } from '@/themes'
import db from '@/utils/indexedDB'

import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

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

initDB().then(() => {
  app.mount('#app')
})
