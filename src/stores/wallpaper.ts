import { defineStore } from 'pinia'

interface State {
  visible: boolean
}

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useWallpaperStore = defineStore('system', {
  state: (): State => ({
    visible: false,
  }),
  actions: {
    updateState(stateName: keyof State, value: any) {
      this[stateName] = value
    },
  },
})
