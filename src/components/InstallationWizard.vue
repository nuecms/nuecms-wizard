<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <!-- Layout with Setup Guide on the Top Side -->
        <div class="mb-8">
          <div class="flex justify-between">
            <div class="text-lg font-semibold text-gray-700">Setup Guide</div>
            <div class="flex space-x-4">
              <div :class="currentStep === 0 ? 'text-blue-600' : ''">{{ t('wizard.step1') }}</div>
              <div :class="currentStep === 1 ? 'text-blue-600' : ''">{{ t('wizard.step2') }}</div>
              <div :class="currentStep === 2 ? 'text-blue-600' : ''">{{ t('wizard.step3') }}</div>
              <div :class="currentStep === 3 ? 'text-blue-600' : ''">{{ t('wizard.step4') }}</div>
              <div :class="currentStep === 4 ? 'text-blue-600' : ''">{{ t('wizard.finish') }}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mb-8">
          <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <img v-if="logo" :src="logo" alt="Logo" class="max-w-full max-h-full p-4" />
            <span v-else class="text-3xl font-bold text-blue-500">CW</span>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">{{ t('wizard.title') }}</h1>

        <div class="mb-4">
          <label for="language-select" class="block text-sm font-medium text-gray-700 mb-1">
            {{ t('wizard.language') }}
          </label>
          <select id="language-select" v-model="currentLanguage" @change="changeLanguage"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="lang in availableLocales" :key="lang" :value="lang">
              {{ languageLabels[lang] || lang }}
            </option>
          </select>
        </div>

        <div v-if="currentStep < steps.length">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">{{ t(steps[currentStep].title) }}</h2>
          <form @submit.prevent="nextStep">
            <!-- License Step -->
            <div v-if="currentStep === 0" class="rounded-md">
              <div class="bg-gray-100 p-4 rounded-md text-sm max-h-80 overflow-y-auto mb-4">
                <div class="">
                  <!-- License agreement content -->
                  <p class="text-gray-700">{{ t('license.intro') }}</p>

                  <ul v-for="(section, index) in sections" :key="index" class="list-disc pl-5 mt-2">
                    <li>
                      <h3 class="text-lg font-semibold text-gray-800">{{ section.title }}</h3>
                      <p class="text-gray-700">{{ section.content }}</p>
                    </li>
                  </ul>

                  <p class="text-gray-700 mt-4">{{ t('license.notice') }}</p>
                </div>
              </div>
              <div class="flex items-center mt-4">
                <input type="checkbox" v-model="isLicenseAccepted" id="accept-license" class="mr-2" />
                <label for="accept-license" class="text-sm text-gray-700">
                  {{ t('wizard.acceptLicense') }}
                </label>
              </div>
            </div>
            <div v-else-if="currentStep === 1">
                <!-- System Overview -->
                <div class="bg-gray-100 p-4 rounded-md text-sm overflow-auto mb-4">
                  <div v-for="(section, sectionName) in systemOverview" :key="sectionName" class="mb-4">
                    <h3 class="font-semibold text-lg mb-2">{{ t(`wizard.${sectionName}`) }}</h3>
                    <div v-for="(value, key) in section" :key="key" class="flex justify-between py-1">
                      <span class="text-gray-600">{{ t(`wizard.${key}`) }}</span>
                      <span class="font-medium">
                        <!-- if value type is boolean use icon to render, else show value -->
                        <template v-if="typeof value === 'boolean'">
                          <span v-if="value" class="text-green-500">✔</span>
                          <span v-else class="text-red-500">✘</span>
                        </template>
                        <template v-else>
                          {{ value }}
                        </template>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            <div v-else>
              <!-- Configuration Step -->
              <div v-for="field in steps[currentStep].fields" :key="field.name" class="mb-4">
                <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ t(field.label) }}
                </label>
                <input :id="field.name" v-model="config[steps[currentStep].key][field.name]" :type="field.type"
                  :placeholder="t(field.placeholder)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :required="field.required" />
              </div>
            </div>

            <div class="flex justify-between mt-6">
              <button v-if="currentStep > 0" @click="prevStep" type="button"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                {{ t('wizard.prev') }}
              </button>
              <button v-if="currentStep === 0" type="submit" :disabled="!isLicenseAccepted"
                  class="px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300">
                  {{  t('wizard.next') }}
                </button>
              <button v-else type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {{ currentStep === steps.length - 1 ? t('wizard.finish') : t('wizard.next') }}
              </button>
            </div>

          </form>
        </div>
        <div v-else class="text-center">
          <div v-if="successState === 1">
            <CheckCircleIcon class="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ t('wizard.completed') }}</h2>
            <p class="text-gray-600 mb-4">{{ completionMessage }}</p>
            <pre
              class="bg-gray-100 p-4 rounded-md text-left overflow-auto text-sm">{{ JSON.stringify(config, null, 2) }}</pre>
          </div>
          <div v-else>
            <XCircleIcon class="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ t('wizard.uncompleted') }}</h2>
            <p class="text-red-600 mb-4">{{ completionMessage }}</p>
            <pre
              class="bg-gray-100 p-4 rounded-md text-left overflow-auto text-sm">{{ JSON.stringify(config, null, 2) }}</pre>

            <div class="flex justify-center mt-6">
              <button  @click="prevStep" type="button"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                {{ t('wizard.prev') }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next'
import { languageLabels, defaultConfig, stepsConfig } from '../config'
import { postData, getData } from '../utils/request'
const { t, messages, locale, availableLocales } = useI18n()

// Reactive state for license acceptance
const isLicenseAccepted = ref(false)

const sections = computed(() => {
  // localized sections
  return messages.value[locale.value].license.sections
})
interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface Step {
  title: string;
  key: string; // Added key to reference the step's configuration
  fields: Field[];
}

interface Config {
  mysql: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: string;
    password: string;
  };
}

const logo = ref<string>('')
const currentStep = ref<number>(0)
const config = reactive<Config>({
  ...defaultConfig
})
const completionMessage = ref<string>('')
const successState = ref<number>(0)
const currentLanguage = ref(locale.value)
const systemOverview = ref({})

const steps: Step[] = stepsConfig


// fetch system overview data
const fetchSystemOverview = async () => {
  try {
    const res = await getData('/api/system-overview')
    systemOverview.value = res.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSystemOverview()
})


// Modify config dynamically in nextStep
const nextStep = async () => {
  if (currentStep.value === 0) {
    // License step - check if the user accepted the license
    if (!isLicenseAccepted.value) {
      alert(t('wizard.licenseError')) // Handle license acceptance error
      return
    }
  }
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  } else {
    try {
      const data = await postData('/api/save-config', config)
      successState.value = data.success ? 1 : 0
      currentStep.value++
      if (data.success) {
        completionMessage.value = t('wizard.configSaved')
      } else {
        completionMessage.value = t('wizard.error', { msg: data.msg })
      }
    } catch (error) {
      if (error instanceof Error) {
        completionMessage.value = t('wizard.error', { msg: error.message })
      } else {
        completionMessage.value = t('wizard.error', { msg: 'Unknown error' })
      }
    }
  }
}

// Go to the previous step
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const changeLanguage = () => {
  locale.value = currentLanguage.value
}
</script>
