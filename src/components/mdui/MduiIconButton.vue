<template>
  <button
    ref="btnRef"
    class="mdui-icon-button"
    :class="{
      'mdui-icon-button--standard': variant === 'standard',
      'mdui-icon-button--filled': variant === 'filled',
      'mdui-icon-button--tonal': variant === 'tonal',
      'mdui-icon-button--outlined': variant === 'outlined',
      'mdui-icon-button--selected': variant !== 'standard' && selected,
      'mdui-icon-button--disabled': disabled,
      'mdui-icon-button--loading': loading,
    }"
    :disabled="disabled || undefined"
    :style="colorStyle"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="mdui-icon-button__loading"></span>

    <!-- Icon -->
    <span class="mdui-icon-button__icon" :class="{ 'mdui-icon-button__icon--hidden': loading }">
      <slot>
        <MduiIcon :name="selected ? (selectedIcon || icon) : icon" />
      </slot>
    </span>

    <!-- State layer -->
    <span class="mdui-icon-button__state-layer"></span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MduiIcon from './MduiIcon.vue'
import { useRipple } from './theme/useRipple'
import {
  generateColorScheme,
  colorSchemeToStyle,
} from './theme/useColorScheme'

const props = withDefaults(
  defineProps<{
    variant?: 'standard' | 'filled' | 'tonal' | 'outlined'
    /** 是否为可选中模式 */
    selectable?: boolean
    /** 是否已选中 */
    selected?: boolean
    /** 选中时的图标 */
    selectedIcon?: string
    disabled?: boolean
    loading?: boolean
    /** 图标名称 */
    icon?: string
    /** 自定义主题色 */
    color?: string
  }>(),
  {
    variant: 'standard',
    selectable: false,
    selected: false,
    disabled: false,
    loading: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const btnRef = ref<HTMLElement | null>(null)
useRipple(btnRef)

function handleClick(event: MouseEvent) {
  emit('click', event)
}

const colorStyle = computed(() => {
  if (!props.color) return {}
  const scheme = generateColorScheme(props.color)
  return colorSchemeToStyle(scheme)
})
</script>

<style scoped>
.mdui-icon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  border: none;
  border-radius: var(--mdui-shape-corner-full);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  color: rgb(var(--mdui-color-on-surface-variant));
  padding: 0;
  font-family: inherit;
  outline: none;
}

.mdui-icon-button :deep(.mdui-ripple) {
  background-color: rgb(var(--mdui-ripple-color, var(--mdui-color-on-surface-variant)));
}

/* Ripple color per variant */
.mdui-icon-button--standard {
  --mdui-ripple-color: var(--mdui-color-on-surface-variant);
}

.mdui-icon-button--filled {
  --mdui-ripple-color: var(--mdui-color-primary);
}

.mdui-icon-button--filled.mdui-icon-button--selected {
  --mdui-ripple-color: var(--mdui-color-on-primary);
}

.mdui-icon-button--tonal {
  --mdui-ripple-color: var(--mdui-color-on-surface-variant);
}

.mdui-icon-button--tonal.mdui-icon-button--selected {
  --mdui-ripple-color: var(--mdui-color-on-secondary-container);
}

.mdui-icon-button--outlined {
  --mdui-ripple-color: var(--mdui-color-on-surface-variant);
}

.mdui-icon-button--outlined.mdui-icon-button--selected {
  --mdui-ripple-color: var(--mdui-color-inverse-on-surface);
}

/* ===== State Layer ===== */
.mdui-icon-button__state-layer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  transition: background-color var(--mdui-motion-duration-short1) var(--mdui-motion-easing-linear);
}

.mdui-icon-button:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-surface-variant), var(--mdui-state-layer-hover));
}

.mdui-icon-button:focus-visible .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-surface-variant), var(--mdui-state-layer-focus));
}

.mdui-icon-button:active .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-surface-variant), var(--mdui-state-layer-pressed));
}

/* ===== Content ===== */
.mdui-icon-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: inherit;
}

.mdui-icon-button__icon--hidden {
  visibility: hidden;
}

/* ===== Loading ===== */
.mdui-icon-button__loading {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.125rem solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: mdui-spin 0.75s linear infinite;
  z-index: 1;
}

@keyframes mdui-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===== Variant: Standard (default) ===== */
/* standard 使用默认样式 */

/* ===== Variant: Standard Selected ===== */
.mdui-icon-button--standard.mdui-icon-button--selected {
  color: rgb(var(--mdui-color-primary));
}

.mdui-icon-button--standard.mdui-icon-button--selected:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-hover));
}

/* ===== Variant: Filled ===== */
.mdui-icon-button--filled {
  color: rgb(var(--mdui-color-primary));
  background-color: rgb(var(--mdui-color-surface-container-highest));
}

.mdui-icon-button--filled:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-hover));
}

.mdui-icon-button--filled:focus-visible .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-focus));
}

.mdui-icon-button--filled:active .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-pressed));
}

/* Filled: when not selectable or selected */
.mdui-icon-button--filled.mdui-icon-button--selected {
  color: rgb(var(--mdui-color-on-primary));
  background-color: rgb(var(--mdui-color-primary));
}

.mdui-icon-button--filled.mdui-icon-button--selected:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-primary), var(--mdui-state-layer-hover));
}

/* ===== Variant: Tonal ===== */
.mdui-icon-button--tonal {
  color: rgb(var(--mdui-color-on-surface-variant));
  background-color: rgb(var(--mdui-color-surface-container-highest));
}

.mdui-icon-button--tonal:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-surface-variant), var(--mdui-state-layer-hover));
}

/* Tonal: selected */
.mdui-icon-button--tonal.mdui-icon-button--selected {
  color: rgb(var(--mdui-color-on-secondary-container));
  background-color: rgb(var(--mdui-color-secondary-container));
}

.mdui-icon-button--tonal.mdui-icon-button--selected:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-secondary-container), var(--mdui-state-layer-hover));
}

/* ===== Variant: Outlined ===== */
.mdui-icon-button--outlined {
  color: rgb(var(--mdui-color-on-surface-variant));
  background: transparent;
  border: 0.0625rem solid rgb(var(--mdui-color-outline));
}

.mdui-icon-button--outlined:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-surface-variant), var(--mdui-state-layer-hover));
}

.mdui-icon-button--outlined:active {
  color: rgb(var(--mdui-color-on-surface));
}

.mdui-icon-button--outlined:active .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-on-surface), var(--mdui-state-layer-pressed));
}

/* Outlined: selected */
.mdui-icon-button--outlined.mdui-icon-button--selected {
  color: rgb(var(--mdui-color-inverse-on-surface));
  background-color: rgb(var(--mdui-color-inverse-surface));
  border: none;
}

.mdui-icon-button--outlined.mdui-icon-button--selected:hover .mdui-icon-button__state-layer {
  background-color: rgba(var(--mdui-color-inverse-on-surface), var(--mdui-state-layer-hover));
}

/* ===== Disabled ===== */
.mdui-icon-button--disabled {
  cursor: default;
  pointer-events: none;
  color: rgba(var(--mdui-color-on-surface), 0.38) !important;
}

.mdui-icon-button--filled.mdui-icon-button--disabled,
.mdui-icon-button--tonal.mdui-icon-button--disabled,
.mdui-icon-button--outlined.mdui-icon-button--disabled {
  background-color: rgba(var(--mdui-color-on-surface), 0.12);
  border-color: rgba(var(--mdui-color-on-surface), 0.12);
}

.mdui-icon-button--disabled .mdui-icon-button__state-layer {
  display: none;
}
</style>
