<template>
  <div>
    <h2 v-if="title" class="text-xl font-semibold mb-4 text-gray-700">{{ title }}</h2>
    <slot></slot>
    <slot v-if="data?.fields?.length" name="fields" :fields="data.fields" :stepKey="data.key">
    </slot>
    <!-- Render children steps if available -->
    <template v-if="data?.children?.length">
      <StepSection
        v-for="step in data.children"
        :key="step.key"
        :title="t(step.title)"
        :data="step"
      >
        <slot v-if="step?.fields?.length" name="fields" :fields="step.fields" :stepKey="step.key">
        </slot>
      </StepSection>
    </template>
  </div>
</template>

<script setup lang="ts" name="Step">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Step } from '../types'

// i18n setup
const { t } = useI18n()

// Props definition
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  data: {
    type: Object as () => Readonly<Step>,
    required: false,
    default: () => ({
      fields: [],
      children: []
    } as const)
  }
})
</script>

<style>
/* Add styles if needed */
</style>
