<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useWallpaperStore } from '@/stores/wallpaper'

const store = useWallpaperStore()
const { t } = useI18n()

const items = ref([
  {
    label: t('menu.changeWallpaper'),
    icon: 'pi pi-image',
    command: () => {
      store.updateState('visible', true)
    },
  },
  {
    label: t('menu.changeHour'),
    icon: 'pi pi-clock',
    items: [
      {
        label: t('menu.12Hour'),
        icon: 'pi pi-caret-right',
      },
      {
        label: t('menu.24Hour'),
        icon: 'pi pi-pause',
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: t('menu.settings'),
    icon: 'pi pi-cog',
  },
])
</script>

<template>
  <ContextMenu global :model="items" />
</template>

<style scoped lang="less"></style>
