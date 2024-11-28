<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <!-- Layout with Setup Guide on the Top Side -->
        <div class="mb-8">
          <div class="flex justify-between items-start">
            <!-- Setup Guide Header -->
            <div class="min-w-[120px] text-lg mt-3 font-semibold text-gray-700">Setup Guide</div>
            <!-- Steps Navigation -->
            <div class="flex-1 flex justify-end">
              <div class="ml-4 w-auto">
                <StepIndicator :current-step="currentStep" :steps="stepTexts" />
              </div>
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

          <form @submit="nextStep">
            <!-- License Step -->
            <StepSection v-if="currentStep === 0" :title="t(steps[currentStep].title)">
              <div class="rounded-md">
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
            </StepSection>

            <StepSection v-else-if="currentStep === 1" :title="t(steps[currentStep].title)">
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
            </StepSection>
            <StepSection v-else :data="steps[currentStep]" :title="t(steps[currentStep].title)">
              <!-- Configuration Step -->
              <template #fields="{ fields, stepKey }">
                <div v-for="field in fields" :key="field.name" class="mb-4 flex items-center">
                  <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-1 w-1/4 text-left pr-4">
                    {{ t(field.label) }}
                  </label>
                  <input :id="field.name" v-model="config[stepKey][field.name]" :type="field.type"
                    :placeholder="t(field.placeholder)"
                    class="w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :required="field.required" />
                </div>
              </template>
            </StepSection>
            <div class="flex justify-between mt-6">
              <button v-if="currentStep > 0" @click="prevStep" type="button"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                {{ t('wizard.prev') }}
              </button>
              <button v-if="currentStep === 0" :class="{
                'px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500': true,
                'bg-gray-300 opacity-50': !isLicenseAccepted
              }" type="submit">
                {{ t('wizard.next') }}
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
              <button @click="prevStep" type="button"
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
import StepSection from './StepSection.vue'
import StepIndicator from './StepIndicator.vue'
import { languageLabels, defaultConfig, stepsConfig } from '@/config'
import { postData, getData } from '@/utils/request'
import { confirm } from '@/utils/confirm'
import { notify } from '@/utils/notify'
import { Step, Config } from '@/types'
import wizardConfig from '../../wizard.config'
import logoImg from '@/assets/icon.svg'
const { t, messages, locale, availableLocales } = useI18n()

// Reactive state for license acceptance
const isLicenseAccepted = ref(false)

const sections = computed(() => {
  // localized sections
  return messages.value[locale.value].license.sections
})

const logo = ref<string>(logoImg)
const currentStep = ref<number>(0)
const config = reactive<Config>({
  ...defaultConfig
})
const completionMessage = ref<string>('')
const successState = ref<number>(0)
const currentLanguage = ref(locale.value)
const systemOverview = ref({})

const stepTexts = computed(() => {
  return [
    t('wizard.step1'),
    t('wizard.step2'),
    t('wizard.step3'),
    t('wizard.step4'),
    t('wizard.finish'),
  ]
})

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
  notify({
    message: 'Welcome to the installation wizard',
  })
  fetchSystemOverview()
})



// Modify config dynamically in nextStep
const nextStep = async (event: Event) => {
  event.preventDefault()
  if (currentStep.value === 0) {
    // License step - check if the user accepted the license
    if (!isLicenseAccepted.value) {
      notify({
        message: t('wizard.licenseError'),
        type: 'error'
      }) // Handle license acceptance error
      return
    } else {
      // check /data/install.lock file
      try {
        const res = await getData('/api/status')
        if (res.success && res.data.locked) {
          if (wizardConfig.canIgnoreLock) {
            currentStep.value++
          } else {
            confirm({
              title: t('wizard.installLocked'),
              message: t('wizard.installLockedMessage'),
              confirmText: t('wizard.installLockedConfirm'),
              cancelText: t('wizard.installLockedCancel'),
              type: 'info'
            }).then((value) => {
              if (value) {
                currentStep.value++
              }
            })
          }
          return
        } else {
          currentStep.value++
        }
      } catch (error: Error | any) {
        notify({
          message: t('wizard.error', { msg: error.message }),
          type: 'error'
        })
        return
      }
    }
    return
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
