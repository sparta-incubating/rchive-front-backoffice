import { EventMap } from '@/types/utils.types';
import { cva, VariantProps } from 'class-variance-authority';

export const toastVariants = cva(
  'fixed left-1/2 top-1 z-20 flex -translate-x-1/2 items-center gap-6 rounded-[10px] px-6 py-4 text-lg text-white',
  {
    variants: {
      variant: {
        primary: 'bg-gray-700',
        warning: 'bg-gray-700',
      },
    },
    defaultVariants: {},
  },
);

class EventEmitter<T extends Record<string, unknown[]>> {
  private listeners: { [K in keyof T]?: Array<(...args: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit<K extends keyof T>(event: K, ...args: T[K]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  }
}

export const eventEmitter = new EventEmitter<EventMap>();

export const createToast = (
  message: string,
  variant: VariantProps<typeof toastVariants>['variant'],
  isIcon: boolean = true,
) => {
  eventEmitter.emit('createToast', { message, variant, isIcon });
};
