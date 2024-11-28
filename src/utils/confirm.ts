import { createApp, reactive, h } from "vue";
import MsgConfirm from "@/components/MsgConfirm.vue";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "success" | "warning" | "error";
}

export const confirm = (options: ConfirmOptions) => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp({
      setup() {
        const state = reactive({
          visible: true,
          ...options,
        });

        const handleConfirm = () => {
          state.visible = false;
          resolve(true);
          cleanup();
        };

        const handleCancel = () => {
          state.visible = false;
          resolve(false);
          cleanup();
        };

        const cleanup = () => {
          app.unmount();
          document.body.removeChild(container);
        };

        return () =>
          h(MsgConfirm, {
            ...state,
            onConfirm: handleConfirm,
            onCancel: handleCancel,
          });
      },
    });

    app.mount(container);
  });
}
