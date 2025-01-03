import { createI18n } from 'vue-i18n'

// 语言包
import en from './lang/en'
import zhCn from './lang/zh-cn'

const i18n = createI18n({
  locale: sessionStorage.getItem('localeLang') || 'zhCn',
  messages: {
    zhCn,
    en,
  },
})
export default i18n
