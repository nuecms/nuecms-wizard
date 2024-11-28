<template>
  <div
    class="flex w-full mb-8 relative"
    :class="[
      direction === 'horizontal' ? 'flex-row' : 'flex-col space-y-4'
    ]"
  >
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="flex items-center"
      :class="[
        direction === 'horizontal' ? 'flex-1' : '',
        direction === 'horizontal' && index !== steps.length - 1 ? 'mr-4' : ''
      ]"
    >
      <div class="flex items-center" :class="[direction === 'vertical' ? 'flex-1' : '']">
        <div
          class="flex min-w-[50px] items-center whitespace-nowrap relative z-10"
          :class="[direction === 'vertical' ? 'flex-row' : 'flex-col']"
        >
          <!-- Default Number Circle -->
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            :class="[
              currentStep === index
                ? 'bg-blue-500 text-white'
                : currentStep > index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-500'
            ]"
            :aria-current="currentStep === index ? 'step' : undefined"
          >
            <template v-if="itemRender">
              <template v-if="currentStep <= index">
                <component
                  :is="getStepContent(step, index).icon"
                  class="w-5 h-5"
                />
              </template>
              <CheckIcon v-else class="w-5 h-5" />
            </template>
            <template v-else>
              <span v-if="currentStep <= index">{{ index + 1 }}</span>
              <CheckIcon v-else class="w-5 h-5" />
            </template>
          </div>
          <!-- Step Text -->
          <span
            class="text-sm font-medium transition-colors duration-200 truncate"
            :class="[
              direction === 'vertical' ? 'ml-3' : 'mt-2',
              currentStep === index
                ? 'text-blue-500'
                : currentStep > index
                ? 'text-blue-500'
                : 'text-gray-500'
            ]"
            :title="itemRender ? getStepContent(step, index).text : step"
          >
            {{ itemRender ? getStepContent(step, index).text : step }}
          </span>
        </div>

        <!-- Connector Line -->
        <div
            v-if="index < steps.length - 1"
            :class="[
              'absolute',
              direction === 'horizontal'
                ? 'h-0.5 top-5 left-[calc(100%+16px)] right-0'
                : 'w-0.5 top-10 bottom-[0px] left-5',
              currentStep > index ? 'bg-green-500' : 'bg-gray-200'
            ]"
            aria-hidden="true"
          ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next'
import { FunctionalComponent } from 'vue'

interface Step {
  text: string
  [key: string]: any
}

interface ItemRenderResult {
  icon: FunctionalComponent
  text: string
}

interface Props {
  currentStep: number
  direction?: 'horizontal' | 'vertical'
  steps: Step[] | string[]
  itemRender?: (props: { step: Step; index: number; current: number }) => ItemRenderResult
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  itemRender: undefined
})

// Helper function to get step content
const getStepContent = (step: Step | string, index: number): ItemRenderResult => {
  if (props.itemRender) {
    return props.itemRender({
      step: typeof step === 'string' ? { text: step } : step,
      index,
      current: props.currentStep
    })
  }
  return {
    icon: CheckIcon,
    text: typeof step === 'string' ? step : step.text
  }
}
</script>

