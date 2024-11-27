<template>
  <transition
    name="slide-fade"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-show="isVisible"
      :class="['fixed top-4 left-1/2 transform -translate-x-1/2 mb-4 p-4 rounded-lg shadow-lg', notificationClasses]"
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
          <p class="text-white">{{ currentMessage }}</p>
        </div>
        <button
          @click="closeNotification"
          class="text-white ml-4 hover:text-gray-300"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { CheckCircleIcon, XCircleIcon, InfoIcon } from 'lucide-vue-next'

// Props
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // 'success', 'error', or 'info'
  },
  duration: {
    type: Number,
    default: 3000, // Duration in milliseconds
  },
})

// State
const isVisible = ref(false)
const currentMessage = ref('')
let resetTimeout = null // Track the reset timeout

// Watch for message prop changes
watch(() => props.message, (newMessage, oldMessage) => {
  if (newMessage && newMessage !== currentMessage.value) {
    // If the message changes, show the notification
    currentMessage.value = newMessage
    isVisible.value = true

    // Reset the message after the duration
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(() => {
      isVisible.value = false
      // Delay resetting the message until the transition is complete
      nextTick(() => {
        currentMessage.value = ''
      })
    }, props.duration)
  }
})

// Close the notification manually
const closeNotification = () => {
  isVisible.value = false
  currentMessage.value = ''
  clearTimeout(resetTimeout) // Ensure timeout is cleared on manual close
}

// Notification type classes
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

// Transition methods for the slide-down effect
const beforeEnter = (el) => {
  el.classList.add('translate-y-[-100%]')
}
const enter = (el, done) => {
  el.offsetHeight // trigger reflow to restart transition
  el.classList.remove('translate-y-[-100%]')
  el.classList.add('transition-transform', 'transform', 'duration-300', 'ease-out')
  done()
}
const leave = (el, done) => {
  el.classList.add('translate-y-[-100%]')
  el.classList.add('transition-transform', 'transform', 'duration-300', 'ease-in')
  done()
}
</script>
