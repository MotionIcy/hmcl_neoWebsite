<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HomePage from './views/HomePage.vue'
import FeatureInstall from './views/sections/FeatureInstall.vue'
import FeatureResources from './views/sections/FeatureResources.vue'
import FeatureManage from './views/sections/FeatureManage.vue'
import FeatureOnline from './views/sections/FeatureOnline.vue'
import FeatureCustomize from './views/sections/FeatureCustomize.vue'
import FeatureCards from './views/FeatureCards.vue'
import SideNav from './components/SideNav.vue'
import { featureCards } from './data/sections'
import { hexToRgb } from './components/mdui/theme/useColorScheme'
import { useDownload } from './composables/useDownload'

const { initDownloads, quickDownload } = useDownload()

const DEFAULT_BG = '#f9f9ff'
const DEFAULT_PRIMARY = '#415f91'

// hex (#415f91) -> "65, 95, 145"（组件内的 rgb(var(--mdui-color-primary)) 需要此格式）
function primaryToRgb(hex: string): string {
  const [r, g, b] = hexToRgb(hex)
  return `${r}, ${g}, ${b}`
}

// 当前可视 Section 的背景色/主色，驱动 TopAppBar 与下载按钮跟随变色
const topBarBg = ref(DEFAULT_BG)
const topBarPrimary = ref(DEFAULT_PRIMARY)
let observer: IntersectionObserver | null = null

function pickVisibleSection(
  entries: IntersectionObserverEntry[],
): HTMLElement | null {
  let best: IntersectionObserverEntry | null = null
  for (const entry of entries) {
    if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
      best = entry
    }
  }
  return best ? (best.target as HTMLElement) : null
}

// 写入全局 CSS 变量，TopAppBar 通过该变量跟随 Section 变色
function applyTopBarTheme(bg: string, primaryHex: string) {
  document.documentElement.style.setProperty('--app-bar-bg', bg)
  document.documentElement.style.setProperty('--app-bar-primary', primaryToRgb(primaryHex))
}

// 入场动画：首次进入视口时添加 is-active（之后保留，避免重复触发闪烁）
function activateSectionOnce(el: HTMLElement) {
  if (!el.classList.contains('is-active')) {
    el.classList.add('is-active')
  }
}

onMounted(() => {
  initDownloads()
  applyTopBarTheme(topBarBg.value, topBarPrimary.value)
  const sections = document.querySelectorAll('.snap-section, .snap-observe')
  observer = new IntersectionObserver(
    (entries) => {
      const target = pickVisibleSection(entries)
      if (!target) return
      // 入场动画只触发一次
      activateSectionOnce(target)
      // 变色逻辑始终跟随当前可见章节
      if (target.dataset.bg) topBarBg.value = target.dataset.bg
      if (target.dataset.primary) topBarPrimary.value = target.dataset.primary
      applyTopBarTheme(topBarBg.value, topBarPrimary.value)
    },
    { threshold: [0.3] },
  )
  sections.forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <MduiTopAppBar variant="small">
    <MduiTopAppBarTitle>
      <img
        class="top-app-bar-title__icon"
        src="./assets/icons/icon@8x.png"
        alt="HMCL"
      />
      HMCL
    </MduiTopAppBarTitle>
    <a
      class="top-app-bar-github"
      href="https://github.com/HMCL-dev/HMCL"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path
          d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"
        />
      </svg>
    </a>
    <MduiButton
      variant="text"
      href="https://docs.hmcl.net/"
      target="_blank"
      rel="noopener noreferrer"
      :style="{ '--mdui-color-primary': primaryToRgb(topBarPrimary) }"
    >
      文档
    </MduiButton>
    <MduiButton
      variant="filled"
      icon="download"
      :style="{ '--mdui-color-primary': primaryToRgb(topBarPrimary) }"
      @click="quickDownload"
    >
      下载
    </MduiButton>
  </MduiTopAppBar>

  <SideNav />

  <main>
    <HomePage />
    <FeatureInstall />
    <FeatureResources />
    <FeatureManage />
    <FeatureOnline />
    <FeatureCustomize />
    <FeatureCards :cards="featureCards" />
  </main>
</template>

<style>
html {
  /* 鼠标设备（触控板/鼠标）才启用整屏吸附；触屏设备正常自由滚动 */
  --app-bar-bg: rgb(249, 249, 255); /* #f9f9ff */
  --app-bar-primary: 65, 95, 145; /* #415f91 */
  --app-bar-on-bg: 25, 29, 38; /* 标题文字色：默认深色 */
}

@media (hover: hover) and (pointer: fine) {
  html {
    scroll-snap-type: y mandatory;
  }
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: rgb(var(--mdui-color-background));
  color: rgb(var(--mdui-color-on-background));
}

/* 每个整屏章节：一屏一切，滚动吸附 */
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* TopAppBar 跟随当前 Section 变色（覆盖组件 scoped 背景） */
.mdui-top-app-bar {
  gap: 0.5rem;
  background-color: var(--app-bar-bg) !important;
  transition: background-color 0.45s var(--mdui-motion-easing-standard) !important;
}

/* 标题文字跟随背景反色（暗色时用浅色文字，避免"消失"） */
.mdui-top-app-bar .mdui-top-app-bar-title {
  color: rgb(var(--app-bar-on-bg)) !important;
  transition: color 0.45s var(--mdui-motion-easing-standard);
}

/* 下载按钮背景色跟随主色平滑过渡 */
.mdui-top-app-bar .mdui-button--filled {
  transition: background-color 0.45s var(--mdui-motion-easing-standard);
}

/* 文档按钮文字色跟随当前章节主题 */
.mdui-top-app-bar .mdui-button--text {
  color: rgb(var(--app-bar-on-bg)) !important;
  transition: color 0.45s var(--mdui-motion-easing-standard);
}

/* GitHub 图标按钮 */
.top-app-bar-github {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--mdui-shape-corner-full);
  color: rgb(var(--app-bar-on-bg));
  text-decoration: none;
  transition:
    color 0.45s var(--mdui-motion-easing-standard),
    background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.top-app-bar-github:hover {
  background-color: rgba(var(--app-bar-on-bg), 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .mdui-top-app-bar {
    transition: none !important;
  }
  .mdui-top-app-bar .mdui-button--filled {
    transition: none;
  }
  .mdui-top-app-bar .mdui-button--text {
    transition: none;
  }
  .mdui-top-app-bar .mdui-top-app-bar-title {
    transition: none;
  }
  .top-app-bar-github {
    transition: none;
  }
}

.top-app-bar-title__icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
  border-radius: 6px;
  vertical-align: middle;
}
</style>
