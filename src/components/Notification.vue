<template>
  <div
    v-if="isVisible"
    :class="['fixed bottom-4 right-4 mb-4 p-4 rounded-lg shadow-lg', notificationClasses]"
    role="alert"
  >
    <div class="flex items-center">
      <div v-if="type === 'success'" class="mr-2 text-green-500">
        <!-- Icon for success -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div v-if="type === 'error'" class="mr-2 text-red-500">
        <!-- Icon for error -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div v-if="type === 'info'" class="mr-2 text-blue-500">
        <!-- Icon for info -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v4m0-12h.01M12 16h.01M4 4h16v16H4V4z" />
        </svg>
      </div>
      <div class="flex-1">
        <p class="text-white">{{ message }}</p>
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
</template>

<script setup>
import { ref, watchEffect } from 'vue'

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
const isVisible = ref(true)

// Watch for message changes
watchEffect(() => {
  if (props.message) {
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
    }, props.duration)
  }
})

// Close notification
const closeNotification = () => {
  isVisible.value = false
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
</script>

<style scoped>
/* Add custom styles for the notification if needed */
</style>
