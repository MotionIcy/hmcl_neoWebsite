<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, type CSSProperties } from 'vue'
import { useRipple } from '../../components/mdui/theme/useRipple'
import img01 from '../../assets/screenshots/resource/01.webp'
import img02 from '../../assets/screenshots/resource/02.webp'
import img03 from '../../assets/screenshots/resource/03.webp'
import img04 from '../../assets/screenshots/resource/04.webp'

const resources = [
  { name: '模组', img: img01, icon: 'extension' },
  { name: '资源包', img: img02, icon: 'palette' },
  { name: '光影', img: img03, icon: 'brightness_6' },
  { name: '地图', img: img04, icon: 'map' },
]

const activeIndex = ref(0)
let timer: number | null = null

// M3 涟漪：为每个资源卡片按钮挂载点击波纹
const cardRefs = resources.map(() => ref<HTMLElement | null>(null))
for (const cardRef of cardRefs) {
  useRipple(cardRef)
}
function bindCardRef(i: number, el: unknown) {
  cardRefs[i]!.value = el as HTMLElement | null
}

// 层叠卡片参数：slot 0 = 激活（最前），1/2/3 = 依次向下斜出
const STACK_CONFIG = [
  { y: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1, zIndex: 10 },
  { y: 42, rotateX: 8, rotateZ: -1.5, scale: 0.88, opacity: 0.5, zIndex: 9 },
  { y: 86, rotateX: 16, rotateZ: -3, scale: 0.74, opacity: 0.18, zIndex: 8 },
  { y: 128, rotateX: 24, rotateZ: -4.5, scale: 0.58, opacity: 0, zIndex: 7 },
]

const cardStyles = computed<CSSProperties[]>(() =>
  resources.map((_, i) => {
    const n = resources.length
    let slot = (i - activeIndex.value) % n
    if (slot < 0) slot += n
    const cfg = STACK_CONFIG[slot] ?? STACK_CONFIG[STACK_CONFIG.length - 1]!
    return {
      transform: `translate(-50%, calc(-50% + ${cfg.y}px)) perspective(1200px) rotateX(${cfg.rotateX}deg) rotateZ(${cfg.rotateZ}deg) scale(${cfg.scale})`,
      opacity: cfg.opacity,
      zIndex: cfg.zIndex,
      pointerEvents: slot === 0 ? 'auto' : 'none',
    } as CSSProperties
  }),
)

function next() {
  activeIndex.value = (activeIndex.value - 1 + resources.length) % resources.length
}

function select(i: number) {
  activeIndex.value = i
  restart()
}

function restart() {
  if (timer) clearInterval(timer)
  timer = window.setInterval(next, 3000)
}

onMounted(() => restart())
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section
    id="resource"
    class="resource-section snap-section"
    data-bg="#f9f9ff"
    data-primary="#415f91"
  >
    <div class="section-shell resource-section__inner">
      <!-- 左：文字 + 资源卡片 -->
      <div class="section-shell__content resource-section__content">
        <h2 class="section-shell__title resource-section__title">轻松获取</h2>
        <p class="section-shell__desc resource-section__desc">
          在启动器内轻松获取模组、资源包、地图与光影包，接入CurseForge与Modrinth。
        </p>

        <div class="resource-grid">
          <button
            v-for="(r, i) in resources"
            :key="r.name"
            :ref="(el) => bindCardRef(i, el)"
            class="resource-card"
            :class="{ 'resource-card--active': i === activeIndex }"
            :style="{ '--card-delay': `${i * 0.1}s` }"
            @click="select(i)"
          >
            <MduiIcon :name="r.icon" class="resource-card__icon" />
            <span class="resource-card__name">{{ r.name }}</span>
            <span class="resource-card__state-layer" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <!-- 右：层叠截图舞台 -->
      <div class="section-shell__media resource-section__media">
        <div class="stack-stage">
          <div
            v-for="(r, i) in resources"
            :key="r.name"
            class="stack-card"
            :class="{ 'stack-card--active': i === activeIndex }"
            :style="cardStyles[i]!"
          >
            <img :src="r.img" :alt="r.name" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.resource-section {
  background-color: #f9f9ff;
}

/* 标题颜色：复用全局 section-shell 布局，仅覆盖主题色 */
.resource-section .resource-section__title {
  color: #415f91;
}

/* ===== Resource Cards ===== */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.resource-card {
  --mdui-ripple-color: var(--mdui-color-primary);

  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border: 1px solid rgb(var(--mdui-color-outline-variant));
  border-radius: var(--mdui-shape-corner-medium);
  background-color: rgb(var(--mdui-color-surface-container-lowest));
  cursor: pointer;
  font-family: inherit;
  color: rgb(var(--mdui-color-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    transform var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

/* M3 涟漪 */
.resource-card :deep(.mdui-ripple) {
  background-color: rgb(var(--mdui-ripple-color));
}

/* M3 状态层 */
.resource-card__state-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background-color var(--mdui-motion-duration-short1) var(--mdui-motion-easing-linear);
}

.resource-card:hover .resource-card__state-layer {
  background-color: rgba(var(--mdui-ripple-color), var(--mdui-state-layer-hover));
}

.resource-card:active .resource-card__state-layer {
  background-color: rgba(var(--mdui-ripple-color), var(--mdui-state-layer-pressed));
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--mdui-elevation-level2);
}

.resource-card--active {
  border-color: #415f91;
  background-color: rgb(var(--mdui-color-primary-container));
  color: #415f91;
  box-shadow: var(--mdui-elevation-level1);
}

.resource-card__icon {
  position: relative;
  z-index: 1;
  font-size: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.resource-card--active .resource-card__icon {
  opacity: 1;
}

.resource-card__name {
  position: relative;
  z-index: 1;
  font-size: var(--mdui-typescale-body-large-size);
  font-weight: 600;
}

/* ===== 层叠截图舞台 ===== */
.stack-stage {
  position: relative;
  height: 0;
  padding-bottom: 62%;
  overflow: visible;
}

.stack-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 92%;
  height: auto;
  border-radius: var(--mdui-shape-corner-medium);
  overflow: hidden;
  will-change: transform, opacity;
  transition:
    transform 0.75s var(--mdui-motion-easing-expo-out),
    opacity 0.55s var(--mdui-motion-easing-standard),
    box-shadow 0.55s var(--mdui-motion-easing-standard);
  transform-origin: center top;
  transform-style: preserve-3d;
}

.stack-card img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--mdui-shape-corner-medium);
  box-shadow: 0 18px 40px rgba(65, 95, 145, 0.25);
}

.stack-card--active img {
  box-shadow: 0 24px 56px rgba(65, 95, 145, 0.3);
}

/* ===== 入场动画 ===== */
.resource-section.is-active .resource-section__title {
  animation: mdui-rise 0.8s var(--mdui-motion-easing-expo-out) 0.1s both;
}

.resource-section.is-active .resource-section__desc {
  animation: mdui-rise 0.8s var(--mdui-motion-easing-expo-out) 0.2s both;
}

.resource-section.is-active .resource-card {
  animation: mdui-card-pop 0.6s var(--mdui-motion-easing-expo-out) var(--card-delay) both;
}

.resource-section.is-active .stack-stage {
  animation: stack-stage-in 1s var(--mdui-motion-easing-expo-out) 0.15s both;
}

@keyframes stack-stage-in {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .resource-section.is-active .resource-section__title,
  .resource-section.is-active .resource-section__desc,
  .resource-section.is-active .resource-card,
  .resource-section.is-active .stack-stage {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .resource-grid {
    text-align: left;
  }

  .stack-stage {
    padding-bottom: 82%;
  }
}
</style>
