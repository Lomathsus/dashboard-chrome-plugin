<script setup lang="ts">
import { Button, InputGroup, InputGroupAddon, InputText } from 'primevue'
</script>

<template>
  <InputGroup class="w-[80%] sm:w-[35%] sm:min-w-[500px] shadow-lg rounded-full">
    <InputText class="glass-effect pl-6 rounded-l-full" placeholder="Search" />
    <InputGroupAddon class="glass-effect rounded-r-full">
      <Button class="px-6" icon="pi pi-search" severity="secondary" variant="text" />
    </InputGroupAddon>
  </InputGroup>
</template>

<style lang="less" scoped>
.glass-effect {
  @apply backdrop-blur
bg-gray-200/50
border
border-solid
border-gray-200/20
hover:bg-gray-50/80
focus:bg-gray-50/80;
}
</style>
