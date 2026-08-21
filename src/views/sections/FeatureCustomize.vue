<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRipple } from '../../components/mdui/theme/useRipple'
import { hexToRgb } from '../../components/mdui/theme/useColorScheme'
import glavoLight from '../../assets/screenshots/customization/glavo_light.webp'
import glavoColor from '../../assets/screenshots/customization/glavo_color.webp'
import glavoStyle from '../../assets/screenshots/customization/glavo_style.webp'
import glavoDark from '../../assets/screenshots/customization/glavo_dark.webp'

type CustomizeKey = 'light' | 'color' | 'style' | 'dark'

const activeKey = ref<CustomizeKey>('light')

const options = [
  { key: 'light' as const, icon: 'wallpaper', label: '背景', desc: '切换启动器背景主题', img: glavoLight },
  { key: 'color' as const, icon: 'palette', label: '配色', desc: '自定义主题主色与强调色', img: glavoColor },
  { key: 'style' as const, icon: 'style', label: '样式', desc: '修改窗口透明度', img: glavoStyle },
  { key: 'dark' as const, icon: 'dark_mode', label: '暗色', desc: '深色主题，夜间更护眼', img: glavoDark },
]

const activeImage = computed(
  () => options.find((o) => o.key === activeKey.value)!.img,
)

// 暗色模式：章节背景跟随变暗
const isDark = computed(() => activeKey.value === 'dark')
const sectionBg = computed(() => (isDark.value ? '#121318' : '#f9f9ff'))
const sectionPrimary = computed(() => (isDark.value ? '#a8c7fa' : '#415f91'))

// 暗色时同步 TopAppBar（背景 + 标题反色 + 下载按钮主色）
watch(isDark, (dark) => {
  const bg = dark ? '#121318' : '#f9f9ff'
  const primary = dark ? '#a8c7fa' : '#415f91'
  const onBg = dark ? '229, 231, 240' : '25, 29, 38'
  const [r, g, b] = hexToRgb(primary)
  document.documentElement.style.setProperty('--app-bar-bg', bg)
  document.documentElement.style.setProperty('--app-bar-on-bg', onBg)
  document.documentElement.style.setProperty('--app-bar-primary', `${r}, ${g}, ${b}`)
})

// M3 涟漪：为每个卡片挂载
const cardRefs = options.map(() => ref<HTMLElement | null>(null))
for (const cardRef of cardRefs) {
  useRipple(cardRef)
}
function bindCardRef(i: number, el: unknown) {
  cardRefs[i]!.value = el as HTMLElement | null
}
</script>

<template>
  <section
    id="customize"
    class="customize-section snap-section"
    :class="{ 'customize-section--dark': isDark }"
    :data-bg="sectionBg"
    :data-primary="sectionPrimary"
  >
    <div class="section-shell customize-section__inner">
      <!-- 左：文字 + 可修改卡片 -->
      <div class="section-shell__content customize-section__content">
        <h2 class="section-shell__title customize-section__title">个性化</h2>
        <p class="section-shell__desc customize-section__desc">
          从背景、配色、样式到深色主题，随心定制属于你的启动器外观，让它与众不同。
        </p>

        <div class="customize-grid">
          <button
            v-for="(opt, i) in options"
            :key="opt.key"
            :ref="(el) => bindCardRef(i, el)"
            class="customize-card"
            :class="{ 'customize-card--active': activeKey === opt.key }"
            @click="activeKey = opt.key"
          >
            <span class="customize-card__icon">
              <MduiIcon :name="opt.icon" />
            </span>
            <span class="customize-card__text">
              <span class="customize-card__label">{{ opt.label }}</span>
              <span class="customize-card__desc">{{ opt.desc }}</span>
            </span>
          </button>
        </div>
      </div>

      <!-- 右：3D 舞台，展示对应图片 -->
      <div class="section-shell__media customize-section__media">
        <div class="customize-stage">
          <div class="customize-stage__glow" aria-hidden="true"></div>
          <div class="customize-stage__frame">
            <Transition name="img-swap" mode="out-in">
              <img
                :key="activeImage"
                class="customize-stage__img"
                :src="activeImage"
                alt="个性化效果预览"
              />
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== 主题变量：暗色模式整体切换 ===== */
.customize-section {
  --cs-bg: #f9f9ff;
  --cs-primary: #415f91;
  --cs-title: #415f91;
  --cs-desc: rgb(var(--mdui-color-on-surface-variant));
  --cs-card-bg: rgb(var(--mdui-color-surface-container-lowest));
  --cs-card-border: rgb(var(--mdui-color-outline-variant));
  --cs-card-text: rgb(var(--mdui-color-on-surface-variant));
  --cs-card-icon-bg: rgb(var(--mdui-color-surface-container-high));
  --cs-glow: rgba(65, 95, 145, 0.16);
  --cs-shadow: rgba(65, 95, 145, 0.35);

  background-color: var(--cs-bg);
  transition: background-color var(--mdui-motion-duration-long4) var(--mdui-motion-easing-standard);
}

.customize-section--dark {
  --cs-bg: #121318;
  --cs-primary: #a8c7fa;
  --cs-title: #a8c7fa;
  --cs-desc: rgba(255, 255, 255, 0.72);
  --cs-card-bg: #1c1e27;
  --cs-card-border: rgba(255, 255, 255, 0.12);
  --cs-card-text: rgba(255, 255, 255, 0.82);
  --cs-card-icon-bg: rgba(255, 255, 255, 0.08);
  --cs-glow: rgba(140, 180, 255, 0.14);
  --cs-shadow: rgba(0, 0, 0, 0.55);
}

/* ===== Content ===== */
/* 标题/描述复用全局 section-shell 布局，仅覆盖主题色与暗色过渡 */
.customize-section .customize-section__title {
  color: var(--cs-title);
  transition: color var(--mdui-motion-duration-long4) var(--mdui-motion-easing-standard);
}

.customize-section .customize-section__desc {
  color: var(--cs-desc);
  transition: color var(--mdui-motion-duration-long4) var(--mdui-motion-easing-standard);
}

/* ===== 可修改卡片 ===== */
.customize-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

.customize-card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--cs-card-border);
  border-radius: var(--mdui-shape-corner-medium);
  background-color: var(--cs-card-bg);
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  color: var(--cs-card-text);
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    transform var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.customize-card :deep(.mdui-ripple) {
  background-color: var(--cs-primary);
}

.customize-card:hover {
  transform: translateX(4px);
  box-shadow: var(--mdui-elevation-level2);
}

.customize-card--active {
  border-color: var(--cs-primary);
  background-color: rgb(var(--mdui-color-primary-container));
  color: #415f91;
  box-shadow: 0 8px 24px rgba(65, 95, 145, 0.2);
}

.customize-section--dark .customize-card--active {
  background-color: rgba(168, 199, 250, 0.18);
  color: #a8c7fa;
  border-color: #a8c7fa;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.customize-card__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--mdui-shape-corner-full);
  background-color: var(--cs-card-icon-bg);
  color: var(--cs-primary);
  font-size: 1.25rem;
  transition:
    background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.customize-card--active .customize-card__icon {
  background-color: var(--cs-primary);
  color: #fff;
}

.customize-card__text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.customize-card__label {
  font-size: var(--mdui-typescale-body-large-size);
  font-weight: 600;
}

.customize-card__desc {
  font-size: var(--mdui-typescale-body-small-size);
  opacity: 0.75;
}

/* ===== 3D 舞台：只有图片本身，无 CSS 背景 ===== */
.customize-section__media {
  flex: 1 1 55%;
  min-width: 0;
  perspective: 1400px;
}

.customize-stage {
  position: relative;
}

/* 背景光斑 */
.customize-stage__glow {
  position: absolute;
  top: -12%;
  right: -12%;
  bottom: -12%;
  left: -12%;
  background: radial-gradient(
    circle at 30% 25%,
    var(--cs-glow) 0%,
    transparent 55%
  );
  filter: blur(24px);
  z-index: 0;
  pointer-events: none;
  transition: background var(--mdui-motion-duration-long4) var(--mdui-motion-easing-standard);
}

/* 3D 展示框：仅承载图片，高度跟随图片 */
.customize-stage__frame {
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  border-radius: var(--mdui-shape-corner-large);
  transform: rotateX(4deg) rotateY(-3deg) scale(1);
  transform-style: preserve-3d;
  box-shadow: 0 30px 80px var(--cs-shadow);
  transition:
    box-shadow var(--mdui-motion-duration-long4) var(--mdui-motion-easing-expo-out),
    transform var(--mdui-motion-duration-long4) var(--mdui-motion-easing-expo-out);
}

.customize-stage__frame:hover {
  transform: rotateX(0deg) rotateY(0deg) scale(1.02);
}

.customize-stage__img {
  display: block;
  width: 100%;
  height: auto;
}

/* 图片切换动画 */
.img-swap-enter-active {
  animation: mdui-img-in 0.55s var(--mdui-motion-easing-expo-out) both;
}
.img-swap-leave-active {
  animation: mdui-img-out 0.3s var(--mdui-motion-easing-standard) both;
}

@keyframes mdui-img-in {
  from {
    opacity: 0;
    transform: perspective(1200px) rotateX(8deg) scale(0.94);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: perspective(1200px) rotateX(0) scale(1);
    filter: blur(0);
  }
}

@keyframes mdui-img-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0.98);
    filter: blur(4px);
  }
}

/* ===== 入场动画（炸裂景深） ===== */
/* title/desc 入场由全局 section.css 提供 */
.customize-section.is-active .customize-card {
  animation: mdui-card-pop 0.6s var(--mdui-motion-easing-expo-out) var(--card-delay) both;
}

.customize-section.is-active .customize-card:nth-child(1) {
  animation-delay: 0.3s;
}
.customize-section.is-active .customize-card:nth-child(2) {
  animation-delay: 0.42s;
}
.customize-section.is-active .customize-card:nth-child(3) {
  animation-delay: 0.54s;
}
.customize-section.is-active .customize-card:nth-child(4) {
  animation-delay: 0.66s;
}

.customize-section.is-active .customize-stage__frame {
  animation: mdui-stage-burst 1.2s var(--mdui-motion-easing-expo-out) 0.25s both;
}

.customize-section.is-active .customize-stage__glow {
  animation: mdui-glow-in 1s var(--mdui-motion-easing-expo-out) 0.3s both;
}

/* 本地 mdui-card-pop 为横向弹入，与全局竖向版本不同，故保留 */
@keyframes mdui-card-pop {
  from {
    opacity: 0;
    transform: translateX(-24px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes mdui-stage-burst {
  0% {
    opacity: 0;
    transform: perspective(1400px) rotateX(18deg) rotateY(-14deg) scale(0.55);
    filter: blur(14px);
  }
  55% {
    opacity: 1;
    transform: perspective(1400px) rotateX(4deg) rotateY(-3deg) scale(1.06);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: perspective(1400px) rotateX(4deg) rotateY(-3deg) scale(1);
    filter: blur(0);
  }
}

@keyframes mdui-glow-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .customize-section.is-active .customize-section__title,
  .customize-section.is-active .customize-section__desc,
  .customize-section.is-active .customize-card,
  .customize-section.is-active .customize-stage__frame,
  .customize-section.is-active .customize-stage__glow {
    animation: none;
  }

  .img-swap-enter-active,
  .img-swap-leave-active {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .customize-grid {
    text-align: left;
  }

  .customize-stage__frame,
  .customize-stage__frame:hover,
  .customize-section.is-active .customize-stage__frame {
    transform: none;
  }
}
</style>
