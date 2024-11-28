<template>
  <transition
    name="slide-fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-show="isVisible"
      :class="[
        'fixed z-50 transform mb-4 p-4 rounded-lg shadow-lg',
        notificationClasses,
        directionClasses,
      ]"
      role="alert"
      :style="{ maxWidth: '90%' }"
    >
      <div class="flex items-center">
        <div v-if="type === 'success'" class="mr-2 text-green-500">
          <!-- Icon for success -->
          <CheckCircleIcon class="w-6 h-6" stroke="white" />
        </div>
        <div v-if="type === 'error'" class="mr-2 text-red-500">
          <!-- Icon for error -->
          <XCircleIcon class="w-6 h-6" stroke="white" />
        </div>
        <div v-if="type === 'info'" class="mr-2 text-blue-500">
          <!-- Icon for info -->
          <InfoIcon class="w-6 h-6" stroke="white" />
        </div>
        <div class="flex-1">
          <p class="text-white">{{ message }}</p>
        </div>
        <button
          @click="closeNotification"
          class="text-white ml-4 hover:text-gray-300"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { CheckCircleIcon, XCircleIcon, InfoIcon } from 'lucide-vue-next'

// Props for the Notification
const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info', // 'success', 'error', or 'info'
  },
  duration: {
    type: Number,
    default: 3000,
  },
  direction: {
    type: [String, Array] as PropType<string | [string] | [string, string]>,
    default: () => ['top', 'center'],
  },
})

// State for visibility
const isVisible = ref(false)
let resetTimeout: ReturnType<typeof setTimeout> | null = null

// Show notification programmatically
const showNotification = () => {
  isVisible.value = true
  if (resetTimeout) clearTimeout(resetTimeout)
  resetTimeout = setTimeout(() => {
    isVisible.value = false
    nextTick(() => {
      emitClose()
    })
  }, props.duration)
}

// Close notification manually
const closeNotification = () => {
  isVisible.value = false
  if (resetTimeout) clearTimeout(resetTimeout)
  nextTick(() => {
    emitClose()
  })
}

// Emit close event
const emitClose = () => {
  const event = new CustomEvent('close-notification')
  window.dispatchEvent(event)
}

// Notification style classes
const notificationClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
})

// Compute position classes based on `direction`
const directionClasses = computed(() => {
  const directions = Array.isArray(props.direction) ? props.direction : [props.direction]

  const verticalMap: Record<string, string> = {
    top: 'top-4',
    bottom: 'bottom-4',
    center: 'top-1/2 transform -translate-y-1/2',
  }

  const horizontalMap: Record<string, string> = {
    left: 'left-4',
    right: 'right-4',
    center: 'left-1/2 transform -translate-x-1/2',
  }

  const verticalClass = verticalMap[directions[0] || 'top']
  const horizontalClass = horizontalMap[directions[1] || 'center']

  return `${verticalClass} ${horizontalClass}`
})

// Transition methods
const beforeEnter = (el: HTMLElement) => {
  el.classList.add('translate-y-[-100%]')
}
const enter = (el: HTMLElement, done: () => void) => {
  el.offsetHeight
  el.classList.remove('translate-y-[-100%]')
  el.classList.add('transition-transform', 'transform', 'duration-300', 'ease-out')
  done()
}
const leave = (el: HTMLElement, done: () => void) => {
  el.classList.add('translate-y-[-100%]')
  el.classList.add('transition-transform', 'transform', 'duration-300', 'ease-in')
  done()
}

// Trigger the notification when the component is mounted
showNotification()
</script>

