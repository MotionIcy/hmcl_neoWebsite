<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface NavItem {
  id: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'hero', label: '首页', icon: 'home' },
  { id: 'install', label: '轻松安装', icon: 'download' },
  { id: 'resource', label: '轻松获取', icon: 'extension' },
  { id: 'manage', label: '轻松管理', icon: 'manage_history' },
  { id: 'online', label: '轻松联机', icon: 'group' },
  { id: 'customize', label: '个性化', icon: 'palette' },
  { id: 'cards', label: '特性', icon: 'apps' },
]

const activeId = ref('hero')
const railRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const sections = navItems
    .map((n) => document.getElementById(n.id))
    .filter((el): el is HTMLElement => !!el)

  observer = new IntersectionObserver(
    (entries) => {
      let best: { id: string; ratio: number } | null = null
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const item = navItems.find((n) => n.id === entry.target.id)
        if (!item) continue
        if (!best || entry.intersectionRatio > best.ratio) {
          best = { id: item.id, ratio: entry.intersectionRatio }
        }
      }
      if (best) activeId.value = best.id
    },
    { threshold: [0.3] },
  )
  sections.forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <nav ref="railRef" class="side-nav" aria-label="页面导航">
    <button
      v-for="item in navItems"
      :key="item.id"
      class="side-nav__item"
      :class="{ 'side-nav__item--active': activeId === item.id }"
      :aria-label="item.label"
      :aria-current="activeId === item.id ? 'true' : undefined"
      @click="scrollToSection(item.id)"
    >
      <span class="side-nav__indicator" aria-hidden="true"></span>
      <span class="side-nav__icon">
        <MduiIcon :name="item.icon" />
      </span>
      <span class="side-nav__label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.side-nav {
  position: fixed;
  top: 50%;
  right: 1.25rem;
  transform: translateY(-50%);
  z-index: 1500;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* ===== 导航项 ===== */
.side-nav__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.4rem;
  border: none;
  border-radius: var(--mdui-shape-corner-full);
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  color: rgb(var(--mdui-color-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
  transition: background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.side-nav__item:hover {
  background-color: rgba(var(--mdui-color-on-surface), 0.06);
}

/* 指示器圆点 */
.side-nav__indicator {
  width: 10px;
  height: 10px;
  border-radius: var(--mdui-shape-corner-full);
  background-color: rgb(var(--mdui-color-outline-variant));
  transition:
    background-color var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-standard),
    transform var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-emphasized-decelerate);
}

.side-nav__item--active .side-nav__indicator {
  background-color: rgb(var(--mdui-color-primary));
  transform: scale(1.5);
}

/* 图标 */
.side-nav__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--mdui-shape-corner-full);
  color: rgb(var(--mdui-color-on-surface-variant));
  font-size: 1.25rem;
  background-color: rgb(var(--mdui-color-surface-container-low));
  box-shadow: var(--mdui-elevation-level1);
  transition:
    background-color var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-standard),
    color var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-standard),
    box-shadow var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-standard);
}

.side-nav__item--active .side-nav__icon {
  background-color: rgb(var(--mdui-color-primary));
  color: rgb(var(--mdui-color-on-primary));
  box-shadow: 0 4px 14px rgba(var(--mdui-color-primary), 0.35);
}

/* 标签：悬停或激活时浮现 */
.side-nav__label {
  position: absolute;
  right: calc(100% + 0.75rem);
  white-space: nowrap;
  padding: 0.3rem 0.75rem;
  border-radius: var(--mdui-shape-corner-small);
  background-color: rgb(var(--mdui-color-inverse-surface));
  color: rgb(var(--mdui-color-inverse-on-surface));
  font-size: var(--mdui-typescale-label-medium-size);
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transform: translateX(6px);
  transition:
    opacity var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-standard),
    transform var(--mdui-motion-duration-medium2) var(--mdui-motion-easing-emphasized-decelerate);
}

.side-nav__item:hover .side-nav__label,
.side-nav__item:focus-visible .side-nav__label,
.side-nav__item--active .side-nav__label {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .side-nav__indicator,
  .side-nav__icon,
  .side-nav__label {
    transition: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .side-nav {
    display: none;
  }
}
</style>
