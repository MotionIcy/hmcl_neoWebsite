<template>
  <div
    class="mdui-top-app-bar-title"
    :class="{
      'mdui-top-app-bar-title--center-aligned': resolvedVariant === 'center-aligned',
      'mdui-top-app-bar-title--standalone': standalone,
    }"
  >
    <!-- 小型标题（始终在 flex 行内显示） -->
    <span
      class="mdui-top-app-bar-title__label"
      :class="{
        'mdui-top-app-bar-title__label--center-aligned': resolvedVariant === 'center-aligned',
        'mdui-top-app-bar-title__label--hidden': (resolvedVariant === 'medium' || resolvedVariant === 'large') && !shrink,
        'mdui-top-app-bar-title__label--shrink': (resolvedVariant === 'medium' || resolvedVariant === 'large') && shrink,
      }"
    >
      <slot />
    </span>

    <!-- 大型标题（仅 medium / large 变体，绝对定位到左下角） -->
    <span
      v-if="resolvedVariant === 'medium' || resolvedVariant === 'large'"
      class="mdui-top-app-bar-title__label-large"
      :class="{
        'mdui-top-app-bar-title__label-large--medium': resolvedVariant === 'medium',
        'mdui-top-app-bar-title__label-large--large': resolvedVariant === 'large',
        'mdui-top-app-bar-title__label-large--visible': !shrink,
        'mdui-top-app-bar-title__label-large--hidden': shrink,
      }"
    >
      <slot name="large"><slot /></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

interface TopAppBarContext {
  variant: ReturnType<typeof computed>
  shrink: ReturnType<typeof computed>
}

const props = withDefaults(
  defineProps<{
    /** 显式指定 variant（优先级高于从 TopAppBar 注入的值） */
    variant?: 'small' | 'center-aligned' | 'medium' | 'large'
  }>(),
  {
    variant: undefined,
  },
)

const ctx = inject<TopAppBarContext>('topAppBar')

const resolvedVariant = computed(
  () => props.variant ?? ctx?.variant?.value ?? 'small',
)
const shrink = computed(() => ctx?.shrink?.value ?? false)
const standalone = computed(() => !ctx)
</script>

<style scoped>
.mdui-top-app-bar-title {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: rgb(var(--mdui-color-on-surface));
}

/* 独立使用时（不在 TopAppBar 内），需要设置高度 */
.mdui-top-app-bar-title--standalone {
  display: flex;
  align-items: center;
}

/* ===== Small Label ===== */
.mdui-top-app-bar-title__label {
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--mdui-typescale-title-large-size);
  font-weight: var(--mdui-typescale-title-large-weight);
  line-height: var(--mdui-typescale-title-large-line-height);
  letter-spacing: var(--mdui-typescale-title-large-tracking);
  opacity: 1;
  transition: opacity var(--mdui-motion-duration-short2) var(--mdui-motion-easing-linear);
}

.mdui-top-app-bar-title__label--hidden {
  opacity: 0;
}

.mdui-top-app-bar-title__label--shrink {
  transition-delay: var(--mdui-motion-duration-short2);
}

.mdui-top-app-bar-title__label--center-aligned {
  justify-content: center;
}

/* ===== Large Label (medium / large 变体) ===== */
.mdui-top-app-bar-title__label-large {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 0;
  transition: opacity var(--mdui-motion-duration-short2) var(--mdui-motion-easing-linear);
}

.mdui-top-app-bar-title__label-large--medium,
.mdui-top-app-bar-title__label-large--large {
  display: block;
}

.mdui-top-app-bar-title__label-large--medium {
  bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--mdui-typescale-headline-small-size);
  font-weight: var(--mdui-typescale-headline-small-weight);
  line-height: var(--mdui-typescale-headline-small-line-height);
  letter-spacing: var(--mdui-typescale-headline-small-tracking);
}

.mdui-top-app-bar-title__label-large--large {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  bottom: 1.25rem;
  font-size: var(--mdui-typescale-headline-medium-size);
  font-weight: var(--mdui-typescale-headline-medium-weight);
  line-height: var(--mdui-typescale-headline-medium-line-height);
  letter-spacing: var(--mdui-typescale-headline-medium-tracking);
}

.mdui-top-app-bar-title__label-large--visible {
  opacity: 1;
  transition-delay: var(--mdui-motion-duration-short2);
}

.mdui-top-app-bar-title__label-large--hidden {
  opacity: 0;
  z-index: -1;
}
</style>
