<script setup lang="ts">
import { ContextMenu } from 'primevue'
import { onMounted, ref } from 'vue'

import bg from '@/assets/images/bg.png'
import DigitalClock from '@/tab/components/DigitalClock.vue'
import SearchBar from '@/tab/components/SearchBar.vue'
import VirtualDocker from '@/tab/components/VirtualDocker.vue'

const backgroundImage = ref('') // 默认背景图片 URL

const setBackgroundImage = (imageUrl: string) => {
  backgroundImage.value = imageUrl
}

const items = ref([
  {
    label: 'Translate',
    icon: 'pi pi-language',
  },
  {
    label: 'Speech',
    icon: 'pi pi-volume-up',
    items: [
      {
        label: 'Start',
        icon: 'pi pi-caret-right',
      },
      {
        label: 'Stop',
        icon: 'pi pi-pause',
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: 'Print',
    icon: 'pi pi-print',
  },
])
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
    <DigitalClock class="self-center" />
    <SearchBar class="self-center" />
    <div class=""><VirtualDocker /></div>
  </div>
  <ContextMenu global :model="items" />
</template>

<style lang="less" scoped></style>
