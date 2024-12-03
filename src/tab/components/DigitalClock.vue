<script setup lang="ts">
import dayjs from 'dayjs'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const formatter = ref('HH:mm:ss')
const formattedTime = ref('')
let clockTimer: number

const updateClock = () => {
  formattedTime.value = dayjs(new Date()).format(formatter.value)
  // 使用 requestAnimationFrame 来优化更新
  clockTimer = requestAnimationFrame(updateClock)
}

const changeFormat = (newFormat: string) => {
  formatter.value = newFormat
  // 重新启动 requestAnimationFrame
  cancelAnimationFrame(clockTimer)
  updateClock()
}

onMounted(() => {
  updateClock()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(clockTimer)
})
</script>

<template>
  <div
    class="text-container text-white text-center overflow-visible whitespace-nowrap text-[2.5rem] sm:text-[5rem]"
  >
    {{ formattedTime }}
  </div>
</template>

<style lang="less" scoped>
.text-container {
  font-family: 'JetBrains Mono', 'salt', serif;
  text-shadow: 5px 3px 10px rgba(73, 73, 73, 0.5);
}
</style>
