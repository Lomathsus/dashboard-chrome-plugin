<template>
  <div class="dock-window dock-advanced">
    <Dock :model="items">
      <template #item="{ item }">
        <a
          v-tooltip.top="item.label"
          href="#"
          class="p-dock-item-link"
          @click="onDockItemClick($event, item)"
        >
          <img :alt="item.label" :src="item.icon" style="width: 100%" />
        </a>
      </template>
    </Dock>

    <Dialog
      v-model:visible="displayTerminal"
      header="Terminal"
      :breakpoints="{ '960px': '50vw' }"
      :style="{ width: '40vw' }"
      maximizable
    >
      <Terminal
        welcomeMessage="Welcome to PrimeVue(cmd: 'date', 'greet {0}' and 'random')"
        prompt="primevue $"
      />
    </Dialog>

    <Dialog
      v-model:visible="displayFinder"
      header="Finder"
      :breakpoints="{ '960px': '50vw' }"
      :style="{ width: '40vw' }"
      maximizable
    >
      <Tree :value="nodes" />
    </Dialog>

    <Galleria
      v-model:visible="displayPhotos"
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="2"
      containerStyle="width: 400px"
      circular
      fullScreen
      :showThumbnails="false"
      showItemNavigators
    >
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
      </template>
    </Galleria>
  </div>
</template>

<script setup lang="ts">
import { TerminalService } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { onBeforeUnmount, onMounted, ref } from 'vue'

onMounted(() => {
  TerminalService.on('command', commandHandler)
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler)
})

const displayFinder = ref(false)
const displayTerminal = ref(false)
const displayPhotos = ref(false)
const images = ref()
const nodes = ref()
const toast = useToast()
const items = ref([
  {
    label: 'Finder',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/finder.svg',
    command: () => {
      displayFinder.value = true
    },
  },
  {
    label: 'Terminal',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/terminal.svg',
    command: () => {
      displayTerminal.value = true
    },
  },
  {
    label: 'App Store',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/appstore.svg',
    command: () => {
      toast.add({
        severity: 'error',
        summary: 'An unexpected error occurred while signing in.',
        detail: 'UNTRUSTED_CERT_TITLE',
        life: 3000,
      })
    },
  },
  {
    label: 'Safari',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/safari.svg',
    command: () => {
      toast.add({ severity: 'warn', summary: 'Safari has stopped working', life: 3000 })
    },
  },
  {
    label: 'Photos',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/photos.svg',
    command: () => {
      displayPhotos.value = true
    },
  },
  {
    label: 'GitHub',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/github.svg',
  },
  {
    label: 'Trash',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/trash.png',
    command: () => {
      toast.add({ severity: 'info', summary: 'Empty Trash', life: 3000 })
    },
  },
])
const menubarItems = ref([
  {
    label: 'Finder',
    class: 'menubar-root',
  },
  {
    label: 'File',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Bookmark',
            icon: 'pi pi-fw pi-bookmark',
          },
          {
            label: 'Video',
            icon: 'pi pi-fw pi-video',
          },
        ],
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
      },
      {
        separator: true,
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-external-link',
      },
    ],
  },
  {
    label: 'Edit',
    items: [
      {
        label: 'Left',
        icon: 'pi pi-fw pi-align-left',
      },
      {
        label: 'Right',
        icon: 'pi pi-fw pi-align-right',
      },
      {
        label: 'Center',
        icon: 'pi pi-fw pi-align-center',
      },
      {
        label: 'Justify',
        icon: 'pi pi-fw pi-align-justify',
      },
    ],
  },
  {
    label: 'Users',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-user-plus',
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-user-minus',
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Filter',
            icon: 'pi pi-fw pi-filter',
            items: [
              {
                label: 'Print',
                icon: 'pi pi-fw pi-print',
              },
            ],
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'List',
          },
        ],
      },
    ],
  },
  {
    label: 'Events',
    items: [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Save',
            icon: 'pi pi-fw pi-calendar-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
      {
        label: 'Archive',
        icon: 'pi pi-fw pi-calendar-times',
        items: [
          {
            label: 'Remove',
            icon: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
    ],
  },
  {
    label: 'Quit',
  },
])
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 2,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },
])

const onDockItemClick = (event, item) => {
  if (item.command) {
    item.command()
  }

  event.preventDefault()
}

const commandHandler = (text) => {
  let response
  const argsIndex = text.indexOf(' ')
  const command = argsIndex !== -1 ? text.substring(0, argsIndex) : text

  switch (command) {
    case 'date':
      response = 'Today is ' + new Date().toDateString()
      break

    case 'greet':
      response = 'Hola ' + text.substring(argsIndex + 1)
      break

    case 'random':
      response = Math.floor(Math.random() * 100)
      break

    default:
      response = 'Unknown command: ' + command
  }

  TerminalService.emit('response', response)
}
</script>

<style scoped>
.dock-demo > .dock-window {
  width: 100%;
  height: 100%;
}

.dock-demo .p-menubar {
  padding: 0;
  border-radius: 0;
}
</style>
