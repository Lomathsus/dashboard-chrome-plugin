<script setup lang="ts">
import { onMounted, ref } from 'vue'

import bg from '@/assets/images/bg.png'
import DigitalClock from '@/tab/components/DigitalClock.vue'
import WallpaperChangeModal from '@/tab/components/Modal/WallpaperChangeModal.vue'
import RightClickMenu from '@/tab/components/RightClickMenu/index.vue'
import SearchBar from '@/tab/components/SearchBar.vue'
import VirtualDocker from '@/tab/components/VirtualDocker.vue'
import db, { type App } from '@/utils/indexedDB'

const backgroundImage = ref('') // 默认背景图片 URL

const setBackgroundImage = (imageUrl: string) => {
  backgroundImage.value = imageUrl
}
const apps = ref<App[]>([])

onMounted(() => {
  setBackgroundImage(bg)
  db.getAll('apps').then((res) => {
    apps.value = res
  })
})
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="h-full flex flex-col"
  >
    <div class="h-[20%]" />
    <DigitalClock class="self-center" />
    <SearchBar class="self-center" />
  </div>
  <RightClickMenu />

  <VirtualDocker />

  <WallpaperChangeModal />
</template>

<style lang="less" scoped></style>
