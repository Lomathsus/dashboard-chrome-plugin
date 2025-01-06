<script setup lang="ts">
import { ref } from 'vue'

import { useWallpaperStore } from '@/stores/wallpaper'

const store = useWallpaperStore()

const tabs = ref([
  { title: 'Picsum', content: 'Tab 1 Content', value: '0' },
  { title: 'Tab 2', content: 'Tab 2 Content', value: '1' },
  { title: 'Tab 3', content: 'Tab 3 Content', value: '2' },
])

const handleVisible = (value: boolean) => {
  store.updateState('visible', value)
}
</script>

<template>
  <Dialog
    :visible="store.visible"
    modal
    header="Edit Profile"
    :style="{ width: '75%' }"
    @update:visible="handleVisible"
  >
    <Tabs value="0">
      <TabList>
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in tabs" :key="tab.content" style="height: 100%" :value="tab.value">
          <div class="grid grid-cols-5 grid-rows-4 gap-1">
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
            <div style="background-color: red; height: 20px" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Dialog>
</template>

<style scoped lang="less"></style>
