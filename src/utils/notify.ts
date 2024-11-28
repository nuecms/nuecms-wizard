import { createApp, h } from 'vue'
import Notification from '@/components/Notification.vue'

export function notify(options: {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}): Promise<void> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const app = createApp({
      render() {
        return h(Notification, {
          message: options.message,
          type: options.type || 'info',
          duration: options.duration || 3000,
          onClose: () => {
            app.unmount()
            document.body.removeChild(container)
            resolve() // Resolve the promise when the notification is closed
          },
        })
      },
    })

    app.mount(container)
  })
}
