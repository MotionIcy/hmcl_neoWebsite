<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import listImg from '../../assets/screenshots/manager/list.webp'
import editImg from '../../assets/screenshots/manager/edit.png'

const sectionRef = ref<HTMLElement | null>(null)
const baseStyle = ref<Record<string, string>>({})
const overlayStyle = ref<Record<string, string>>({})

function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const vh = window.innerHeight
  const top = el.getBoundingClientRect().top + window.scrollY
  // 0~1：本 section 内滚动进度
  const p = Math.min(Math.max((window.scrollY - top) / vh, 0), 1)
  const t = 1 - p

  // ---- list.webp：继续滚动时推远缩小、变暗 ----
  baseStyle.value = {
    transform: `scale(${1 - 0.08 * p})`,
    filter: `brightness(${1 - 0.15 * p})`,
  }

  // ---- edit.png：从左侧带 3D 翻转滑入覆盖 ----
  // 从左侧外部 (-105%) 滑到 0，同时 rotateY 从 20deg 归正
  const tx = -105 + 105 * p
  const rotateY = 20 * t
  const scale = 0.92 + 0.08 * p
  const blur = 6 * t
  const shadowOpacity = 0.25 * p

  overlayStyle.value = {
    transform: `perspective(1400px) translateX(${tx}%) rotateY(${rotateY}deg) scale(${scale})`,
    filter: `blur(${blur}px) drop-shadow(0 18px 36px rgba(60, 50, 10, ${shadowOpacity}))`,
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section
    id="manage"
    ref="sectionRef"
    class="manage-section snap-section"
    data-bg="#f9f9ff"
    data-primary="#415f91"
  >
    <div class="manage-section__inner">
      <!-- 左：媒体区域 -->
      <div class="section-shell__media manage-section__media">
        <div class="manage-media">
          <img
            class="manage-media__base"
            :src="listImg"
            alt="管理列表"
            :style="baseStyle"
          />
          <img
            class="manage-media__overlay"
            :src="editImg"
            alt="编辑界面"
            :style="overlayStyle"
          />
        </div>
      </div>

      <!-- 右：内容区域 -->
      <div class="section-shell__content manage-section__content">
        <h2 class="section-shell__title manage-section__title">轻松管理</h2>
        <p class="section-shell__desc manage-section__desc">
          统一管理多个游戏版本与模组配置，随时导出、导入整合包，轻松分享给好友。
        </p>

        <!-- 齿轮动画：大齿轮旋转 -->
        <div class="gear-anim" aria-hidden="true">
          <span class="gear-anim__main">
            <MduiIcon name="settings" class="gear-anim__icon" />
            <span class="gear-anim__glow" />
          </span>
        </div>
      </div>
    </div>

    <!-- 第二屏吸附锚点：滚动 100vh 后（滑入完成）停住，再滚才进下一节 -->
    <div class="manage-section__snap-anchor" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.manage-section {
  position: relative;
  height: 200vh; /* 两屏：第一屏滑入过渡，第二屏离开进入下一节 */
  background-color: #f9f9ff;
}

.manage-section__inner {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  height: 100vh;
}

/* 第二屏吸附锚点：位于本节的 100vh 处 */
.manage-section__snap-anchor {
  position: absolute;
  top: 100vh;
  left: 0;
  width: 1px;
  height: 1px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ===== Media（前后遮挡舞台） ===== */
.manage-media {
  position: relative;
  border-radius: var(--mdui-shape-corner-medium);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(65, 95, 145, 0.15);
}

.manage-media__base {
  display: block;
  width: 100%;
  height: auto;
  clip-path: inset(12% 0 100% 0);
  opacity: 0;
  will-change: transform, filter, clip-path;
  transition:
    clip-path 0.9s var(--mdui-motion-easing-expo-out),
    opacity 0.6s ease;
}

.manage-section.is-active .manage-media__base {
  clip-path: inset(0 0 0 0);
  opacity: 1;
}

.manage-media__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform, filter;
}

/* ===== Content ===== */
/* 布局复用全局 section-shell，仅覆盖标题主题色与描述下边距 */
.manage-section .manage-section__title {
  color: #415f91;
}

.manage-section .manage-section__desc {
  margin-bottom: 0;
}

/* ===== 齿轮动画 ===== */
.gear-anim {
  position: relative;
  width: 120px;
  height: 120px;
  margin-top: 2rem;
}

/* 大齿轮 */
.gear-anim__main {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #415f91;
  animation: gear-float 4s ease-in-out infinite;
}

.gear-anim__main .gear-anim__icon {
  font-size: 4.5rem;
  width: 4.5rem;
  height: 4.5rem;
  animation: gear-spin-cw 7s linear infinite;
}

/* 大齿轮光晕 */
.gear-anim__glow {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(65, 95, 145, 0.18) 0%,
    rgba(65, 95, 145, 0) 70%
  );
  animation: gear-glow-pulse 3.2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes gear-spin-cw {
  to {
    transform: rotate(360deg);
  }
}

@keyframes gear-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@keyframes gear-glow-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

/* ===== 入场动画（文字部分一次性播放） ===== */
/* title/desc 入场由全局 section.css 提供 */
.manage-section.is-active .gear-anim {
  animation: mdui-rise 0.8s var(--mdui-motion-easing-expo-out) 0.36s both;
}

.manage-section.is-active .gear-anim__main {
  animation:
    gear-spin-in 0.9s var(--mdui-motion-easing-emphasized-decelerate) 0.5s both,
    gear-float 4s ease-in-out 1.2s infinite;
}

@keyframes gear-spin-in {
  from {
    opacity: 0;
    transform: scale(0.4) rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .manage-section.is-active .manage-section__title,
  .manage-section.is-active .manage-section__desc,
  .manage-section.is-active .gear-anim,
  .manage-section.is-active .gear-anim__main {
    animation: none;
  }

  .gear-anim__main .gear-anim__icon,
  .gear-anim__glow {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .manage-section__inner {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .gear-anim {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
