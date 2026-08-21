<template>
  <header
    class="mdui-top-app-bar"
    :class="{
      'mdui-top-app-bar--center-aligned': variant === 'center-aligned',
      'mdui-top-app-bar--medium': variant === 'medium',
      'mdui-top-app-bar--large': variant === 'large',
      'mdui-top-app-bar--scrolling': isScrolling,
      'mdui-top-app-bar--shrink': isShrinking,
    }"
    :style="{
      ...colorStyle,
      ...(scrollTarget ? { position: 'absolute' } : {}),
    }"
    ref="barRef"
  >
    <slot />
  </header>
  <!-- 占位元素 -->
  <div
    class="mdui-top-app-bar-placeholder"
    :class="{
      'mdui-top-app-bar-placeholder--medium': variant === 'medium',
      'mdui-top-app-bar-placeholder--large': variant === 'large',
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import {
  generateColorScheme,
  colorSchemeToStyle,
} from './theme/useColorScheme'

const props = withDefaults(
  defineProps<{
    variant?: 'small' | 'center-aligned' | 'medium' | 'large'
    /** 滚动行为: hide | shrink | elevate (可组合，默认 elevate) */
    scrollBehavior?: string
    /** 自定义滚动容器选择器。不设置则监听 window */
    scrollTarget?: string
    /** 自定义主题色 */
    color?: string
  }>(),
  {
    variant: 'small',
    scrollBehavior: 'elevate',
    scrollTarget: undefined,
  },
)

const barRef = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
const isShrinking = ref(false)
let lastScrollY = 0

// 提供给 Title 子组件
provide('topAppBar', {
  variant: computed(() => props.variant),
  shrink: isShrinking,
})

const colorStyle = computed(() => {
  if (!props.color) return {}
  const scheme = generateColorScheme(props.color)
  return colorSchemeToStyle(scheme)
})

function getScrollElement(): HTMLElement | Window {
  if (props.scrollTarget) {
    const el = document.querySelector(props.scrollTarget) as HTMLElement
    return el || window
  }
  return window
}

function handleScroll() {
  const scrollEl = getScrollElement()
  const scrollY =
    scrollEl instanceof Window ? scrollEl.scrollY : scrollEl.scrollTop

  const behaviors = (props.scrollBehavior || '').split(/\s+/).filter(Boolean)

  // elevate: 滚动后显示阴影
  if (behaviors.includes('elevate')) {
    isScrolling.value = scrollY > 0
  }

  // shrink: medium/large 滚动时缩到 64px
  if (
    behaviors.includes('shrink') &&
    (props.variant === 'medium' || props.variant === 'large')
  ) {
    isShrinking.value = scrollY > 0
  }

  // hide: 向下滚隐藏，向上滚显示
  if (behaviors.includes('hide') && barRef.value) {
    const bar = barRef.value
    if (scrollY > lastScrollY && scrollY > 64) {
      bar.style.transform = `translateY(-${getHideOffset()}px)`
    } else {
      bar.style.transform = 'translateY(0)'
    }
  }

  lastScrollY = scrollY
}

function getHideOffset(): number {
  switch (props.variant) {
    case 'medium':
      return 112 + 10
    case 'large':
      return 152 + 10
    default:
      return 64 + 10
  }
}

onMounted(() => {
  const scrollEl = getScrollElement()
  scrollEl.addEventListener('scroll', handleScroll, { passive: true })
  // 初始检查
  handleScroll()
})

onUnmounted(() => {
  const scrollEl = getScrollElement()
  scrollEl.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.mdui-top-app-bar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-start;
  z-index: 2000;
  height: 4rem;
  padding: 0.75rem 0.5rem;
  background-color: rgb(var(--mdui-color-surface));
  transition:
    transform var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard),
    height var(--mdui-motion-duration-long2) var(--mdui-motion-easing-standard),
    box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear),
    background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);
}

/* 滚动时加阴影 + 变背景 */
.mdui-top-app-bar--scrolling {
  background-color: rgb(var(--mdui-color-surface-container));
  box-shadow: var(--mdui-elevation-level2);
}

.mdui-top-app-bar--medium {
  align-items: flex-start;
  height: 7rem;
}

.mdui-top-app-bar--large {
  align-items: flex-start;
  height: 9.5rem;
}

.mdui-top-app-bar--shrink.mdui-top-app-bar--medium,
.mdui-top-app-bar--shrink.mdui-top-app-bar--large {
  align-items: center;
  transition-duration: var(--mdui-motion-duration-short4);
  height: 4rem;
}

/* ===== Placeholder ===== */
.mdui-top-app-bar-placeholder {
  height: 4rem;
}

.mdui-top-app-bar-placeholder--medium {
  height: 7rem;
}

.mdui-top-app-bar-placeholder--large {
  height: 9.5rem;
}
</style>
