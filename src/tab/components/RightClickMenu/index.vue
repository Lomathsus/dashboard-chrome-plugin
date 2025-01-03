<script setup lang="ts">
import { ContextMenu } from 'primevue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const items = ref([
  {
    label: t('menu.changeWallpaper'),
    icon: 'pi pi-image',
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
    label: t('menu.settings'),
    icon: 'pi pi-cog',
  },
])
</script>

<template>
  <ContextMenu global :model="items" />
</template>

<style scoped lang="less"></style>
