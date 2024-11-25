<script setup lang="ts">
import { onMounted, ref } from 'vue'

import bg from '@/assets/images/bg.png'
import DigitalClock from '@/tab/components/DigitalClock.vue'
import VirtualDocker from '@/tab/components/VirtualDocker.vue'

const backgroundImage = ref('') // 默认背景图片 URL
const setBackgroundImage = (imageUrl: string) => {
  backgroundImage.value = imageUrl
}

onMounted(() => {
  setBackgroundImage(bg)
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
    <div class="self-center"><DigitalClock /></div>
    <div class=""><VirtualDocker /></div>
  </div>
</template>

<style scoped></style>
