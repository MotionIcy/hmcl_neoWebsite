<template>
  <component
    :is="isLink ? 'a' : 'button'"
    ref="btnRef"
    class="mdui-button"
    :class="{
      'mdui-button--filled': variant === 'filled',
      'mdui-button--elevated': variant === 'elevated',
      'mdui-button--tonal': variant === 'tonal',
      'mdui-button--outlined': variant === 'outlined',
      'mdui-button--text': variant === 'text',
      'mdui-button--full-width': fullWidth,
      'mdui-button--disabled': disabled,
      'mdui-button--loading': loading,
    }"
    :href="isLink ? href : undefined"
    :disabled="!isLink ? disabled || undefined : undefined"
    :type="!isLink ? type : undefined"
    :name="!isLink ? name : undefined"
    :value="!isLink ? value : undefined"
    :style="colorStyle"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <span v-if="loading" class="mdui-button__loading"></span>

    <!-- Content wrapper -->
    <span class="mdui-button__content" :class="{ 'mdui-button__content--hidden': loading }">
      <!-- Leading icon slot -->
      <span v-if="$slots.icon || icon" class="mdui-button__icon">
        <slot name="icon">
          <MduiIcon v-if="icon" :name="icon" />
        </slot>
      </span>

      <!-- Label -->
      <span class="mdui-button__label">
        <slot />
      </span>

      <!-- Trailing icon slot -->
      <span v-if="$slots['end-icon'] || endIcon" class="mdui-button__end-icon">
        <slot name="end-icon">
          <MduiIcon v-if="endIcon" :name="endIcon" />
        </slot>
      </span>
    </span>

    <!-- State layer -->
    <span class="mdui-button__state-layer"></span>
  </component>
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
    variant?: 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text'
    fullWidth?: boolean
    disabled?: boolean
    loading?: boolean
    icon?: string
    endIcon?: string
    href?: string
    type?: string
    name?: string
    value?: string
    /** 自定义主题色（Hex 值，如 #6750A4） */
    color?: string
  }>(),
  {
    variant: 'text',
    fullWidth: false,
    disabled: false,
    loading: false,
    href: undefined,
    type: 'button',
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()

const btnRef = ref<HTMLElement | null>(null)
useRipple(btnRef)

const isLink = computed(() => !!props.href && !props.disabled)

const colorStyle = computed(() => {
  if (!props.color) return {}
  const scheme = generateColorScheme(props.color)
  return colorSchemeToStyle(scheme)
})
</script>

<style scoped>
/* ===== Button Base ===== */
.mdui-button {
  --shape-corner: var(--mdui-shape-corner-full);
  --mdui-ripple-color: var(--mdui-color-primary);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: var(--shape-corner);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);
  min-width: 3rem;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: var(--mdui-typescale-label-large-size);
  font-weight: var(--mdui-typescale-label-large-weight);
  line-height: var(--mdui-typescale-label-large-line-height);
  letter-spacing: var(--mdui-typescale-label-large-tracking);
  color: rgb(var(--mdui-color-primary));
  background: transparent;
  font-family: inherit;
  gap: 0.5rem;
}

.mdui-button :deep(.mdui-ripple) {
  background-color: rgb(var(--mdui-ripple-color));
}

.mdui-button--text {
  --mdui-ripple-color: var(--mdui-color-primary);
}

.mdui-button--elevated {
  --mdui-ripple-color: var(--mdui-color-primary);
}

.mdui-button--filled {
  --mdui-ripple-color: var(--mdui-color-on-primary);
}

.mdui-button--tonal {
  --mdui-ripple-color: var(--mdui-color-on-secondary-container);
}

.mdui-button--outlined {
  --mdui-ripple-color: var(--mdui-color-primary);
}

/* ===== State Layer ===== */
.mdui-button__state-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background-color var(--mdui-motion-duration-short1) var(--mdui-motion-easing-linear);
}

.mdui-button:hover .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-hover));
}

.mdui-button:focus-visible .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-focus));
}

.mdui-button:active .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-pressed));
}

/* ===== Content ===== */
.mdui-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1;
}

.mdui-button__content--hidden {
  visibility: hidden;
}

.mdui-button__icon,
.mdui-button__end-icon {
  display: inline-flex;
  font-size: 1.2857em;
}

.mdui-button__label {
  display: inline-flex;
  align-items: center;
}

/* ===== Loading ===== */
.mdui-button__loading {
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
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

/* ===== Full Width ===== */
.mdui-button--full-width {
  width: 100%;
}

/* ===== Variant: Elevated ===== */
.mdui-button--elevated {
  color: rgb(var(--mdui-color-primary));
  background-color: rgb(var(--mdui-color-surface-container-low));
  box-shadow: var(--mdui-elevation-level1);
}

.mdui-button--elevated .mdui-button__state-layer {
  --mdui-state-color: var(--mdui-color-primary);
}

.mdui-button--elevated:hover {
  box-shadow: var(--mdui-elevation-level2);
}

/* ===== Variant: Filled ===== */
.mdui-button--filled {
  color: rgb(var(--mdui-color-on-primary));
  background-color: rgb(var(--mdui-color-primary));
}

.mdui-button--filled .mdui-button__state-layer {
  --mdui-state-color: var(--mdui-color-on-primary);
}

.mdui-button--filled:hover .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-on-primary), var(--mdui-state-layer-hover));
}

.mdui-button--filled:focus-visible .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-on-primary), var(--mdui-state-layer-focus));
}

.mdui-button--filled:active .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-on-primary), var(--mdui-state-layer-pressed));
}

.mdui-button--filled:hover {
  box-shadow: var(--mdui-elevation-level1);
}

/* ===== Variant: Tonal ===== */
.mdui-button--tonal {
  color: rgb(var(--mdui-color-on-secondary-container));
  background-color: rgb(var(--mdui-color-secondary-container));
}

.mdui-button--tonal .mdui-button__state-layer {
  --mdui-state-color: var(--mdui-color-on-secondary-container);
}

.mdui-button--tonal:hover .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-on-secondary-container), var(--mdui-state-layer-hover));
}

.mdui-button--tonal:focus-visible .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-on-secondary-container), var(--mdui-state-layer-focus));
}

.mdui-button--tonal:active .mdui-button__state-layer {
  background-color: rgba(var(--mdui-color-on-secondary-container), var(--mdui-state-layer-pressed));
}

.mdui-button--tonal:hover {
  box-shadow: var(--mdui-elevation-level1);
}

/* ===== Variant: Outlined ===== */
.mdui-button--outlined {
  color: rgb(var(--mdui-color-primary));
  background: transparent;
  border: 0.0625rem solid rgb(var(--mdui-color-outline));
}

.mdui-button--outlined:focus-visible {
  border-color: rgb(var(--mdui-color-primary));
}

/* ===== Disabled ===== */
.mdui-button--disabled {
  cursor: default;
  pointer-events: none;
  color: rgba(var(--mdui-color-on-surface), 0.38) !important;
  box-shadow: none !important;
}

.mdui-button--elevated.mdui-button--disabled,
.mdui-button--filled.mdui-button--disabled,
.mdui-button--tonal.mdui-button--disabled {
  background-color: rgba(var(--mdui-color-on-surface), 0.12);
}

.mdui-button--outlined.mdui-button--disabled {
  border-color: rgba(var(--mdui-color-on-surface), 0.12);
}

.mdui-button--disabled .mdui-button__state-layer {
  display: none;
}
</style>
