import {toast, type ToastPosition, type ToastType} from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface ToastOptions {
    delay?: number;
    position?: ToastPosition;
}

export function Toast(type: ToastType, message: string, options?: ToastOptions) {
    toast(message, {
        type: type,
        rtl: true,
        theme: "colored",
        position: "bottom-center",
        ...options
    });
}
