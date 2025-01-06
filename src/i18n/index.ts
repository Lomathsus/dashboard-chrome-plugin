import { createI18n } from 'vue-i18n'

// 语言包
import en from './lang/en'
import zhCn from './lang/zh-cn'

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: sessionStorage.getItem('localeLang') || 'zhCn',
  messages: {
    zhCn,
    en,
  },
})
export default i18n
