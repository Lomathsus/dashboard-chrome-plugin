<script setup lang="ts">
import Button from 'primevue/button'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const currentTime = ref(new Date())
const formattedTime = ref('')
let clockTimer: number

const updateClock = () => {
  currentTime.value = new Date()
  formattedTime.value = currentTime.value.toLocaleTimeString()
  // 使用 requestAnimationFrame 来优化更新
  clockTimer = requestAnimationFrame(updateClock)
}

onMounted(() => {
  clockTimer = requestAnimationFrame(updateClock)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(clockTimer)
})
</script>

<template>
  <Button label="Submit" />
  <div class="text-blue-600">{{ currentTime }}</div>
</template>

<!--<style lang="less" scoped></style>-->
