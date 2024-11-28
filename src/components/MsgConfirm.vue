<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 w-80"
      :class="typeClass"
    >
      <div class="flex items-center justify-between">
        <h3 :class="typeClass" class="text-lg font-semibold flex items-center">
          <component :is="typeIcon" class="inline-block mr-2 w-5 h-5" />
          {{ title }}
        </h3>
        <button @click="handleCancel" class="text-gray-500 hover:text-gray-800">
          <X class="w-5 h-5" />
        </button>
      </div>
      <div class="mt-4 text-gray-700">{{ message }}</div>
      <div class="flex justify-end mt-6 space-x-3">
        <button
          @click="handleCancel"
          class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {{ cancelText }}
        </button>
        <button
          @click="handleConfirm"
          class="px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2"
          :class="confirmButtonClass"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, FunctionalComponent } from "vue";
import { Icon, Info, AlertTriangle, AlertCircle, CheckCircle, X } from "lucide-vue-next";
import { defineProps, defineEmits } from "vue";

// Define Props with TypeScript types
const props = defineProps<{
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "error" | "warning" | "success";
}>();

// Define Emits with TypeScript types
const emit = defineEmits<{
  (event: "confirm"): void;
  (event: "cancel"): void;
}>();

// Default prop values
const confirmText = computed(() => props.confirmText || "OK");
const cancelText = computed(() => props.cancelText || "Cancel");
const type = computed(() => props.type || "info");

// Maps for dynamic properties
const typeIcons: Record<string, FunctionalComponent> = {
  info: Info,
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
};

const typeClasses: Record<string, string> = {
  info: "text-blue-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  success: "text-green-500",
};

const confirmButtonClasses: Record<string, string> = {
  info: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
  error: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
  warning: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
  success: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
};

// Computed properties for dynamic values
const typeIcon = computed(() => typeIcons[type.value] || "info");
const typeClass = computed(() => typeClasses[type.value] || "text-blue-500 bg-blue-100");
const confirmButtonClass = computed(
  () => confirmButtonClasses[type.value] || "bg-blue-500"
);

// Event handlers
const handleConfirm = () => emit("confirm");
const handleCancel = () => emit("cancel");
</script>

<style scoped>
/* Add transition effects for the modal and buttons */
.bg-blue-100, .bg-red-100, .bg-yellow-100, .bg-green-100 {
  transition: background-color 0.3s ease;
}

button {
  transition: background-color 0.2s ease, transform 0.2s ease;
}


button:active {
  transform: translateY(0);
}
</style>
