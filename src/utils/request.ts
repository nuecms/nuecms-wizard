import { i18n } from '../i18n'

interface ApiResponse<T = any> {
  success?: boolean
  data?: T
  msg?: string
  error?: string
}

export const postData = async <T = any>(url: string, data: any): Promise<ApiResponse<T>> => {
  try {
    console.log("Sending data to:", url, data)  // Log the URL and data
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': i18n.global.locale.value
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    // Handle i18n messages
    if (result.msg && result.msg.startsWith('wizard.')) {
      result.msg = i18n.global.t(result.msg)
    }
    if (result.error && result.error.startsWith('wizard.')) {
      result.error = i18n.global.t(result.error)
    }

    return result
  } catch (error) {
    // Handle error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      error: i18n.global.t('wizard.error', { msg: errorMessage })
    }
  }
}

export const getData = async <T = any>(url: string, params: object = {}): Promise<ApiResponse<T>> => {
  try {
    if (Object.keys(params).length > 0) {
      url += '?' + serialize(params)
    }
    console.log("Getting data from:", url)  // Log the URL

    const response = await fetch(url, {
      headers: {
        'Accept-Language': i18n.global.locale.value
      }
    })

    const result = await response.json()

    // Handle i18n messages
    if (result.msg && result.msg.startsWith('wizard.')) {
      result.msg = i18n.global.t(result.msg)
    }
    if (result.error && result.error.startsWith('wizard.')) {
      result.error = i18n.global.t(result.error)
    }

    return result
  } catch (error) {
    // Handle error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      error: i18n.global.t('wizard.error', { msg: errorMessage })
    }
  }
}

export const serialize = (obj: { [key: string]: any }): string => {
  return Object.keys(obj)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
}

