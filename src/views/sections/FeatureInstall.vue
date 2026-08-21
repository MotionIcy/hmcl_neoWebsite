<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import img01 from '../../assets/screenshots/install_game/01.webp'
import img02 from '../../assets/screenshots/install_game/02.png'
import minecraftIcon from '../../assets/icons/modloaders/minecraft.webp'
import forgeIcon from '../../assets/icons/modloaders/forge.webp'
import fabricIcon from '../../assets/icons/modloaders/fabirc.webp'
import neoforgedIcon from '../../assets/icons/modloaders/neoforged.webp'

const modloaders = [
  { name: 'Minecraft', icon: minecraftIcon },
  { name: 'Forge', icon: forgeIcon },
  { name: 'Fabric', icon: fabricIcon },
  { name: 'NeoForged', icon: neoforgedIcon },
]

const sectionRef = ref<HTMLElement | null>(null)
const img01Style = ref<Record<string, string>>({})
const img02Style = ref<Record<string, string>>({})

function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const vh = window.innerHeight
  const top = el.getBoundingClientRect().top + window.scrollY
  // 第一段 0~1vh："旧窗口被推远，新窗口翻出放大"
  const p = Math.min(Math.max((window.scrollY - top) / vh, 0), 1)
  const t = 1 - p

  // ---- 01：旧窗口被推远，缩小 + 轻微下沉 ----
  img01Style.value = {
    transform: `scale(${1 - 0.14 * p}) translateY(${10 * p}px)`,
  }

  // ---- 02：新窗口，从右下角翻出（3D 透视）+ 放大聚焦 ----
  // 从右下角 (14%, 118%) 斜插到 (2%, -20%)；3D 翻转从 -28deg → 0
  const tx = 14 - p * 12
  const ty = 118 - p * 138
  const rotY = 28 * t
  const scale = 0.92 + 0.2 * p // 最终 1.12，比 01 大（打破等大）
  const blur = 8 * t
  const shadowOpacity = 0.4 * p
  const shadowY = 14 + 18 * p

  img02Style.value = {
    transform: `perspective(1400px) translate(${tx}%, ${ty}%) rotateY(${rotY}deg) scale(${scale})`,
    filter: `blur(${blur}px) drop-shadow(0 ${shadowY}px 26px rgba(65, 95, 145, ${shadowOpacity}))`,
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
    id="install"
    ref="sectionRef"
    class="install-section snap-section"
    data-bg="#f9f9ff"
    data-primary="#415f91"
    :style="{ '--feature-bg': '#f9f9ff', '--feature-primary': '#415f91' }"
  >
    <div class="install-section__inner">
      <!-- 左：01/02 前后遮挡舞台 -->
      <div class="section-shell__media install-section__media">
        <img
          class="install-img install-img--01"
          :src="img01"
          alt="轻松安装 步骤一"
          :style="img01Style"
        />
        <img
          class="install-img install-img--02"
          :src="img02"
          alt="轻松安装 步骤二"
          :style="img02Style"
        />
      </div>

      <!-- 右：文字 + Modloader 卡片 -->
      <div class="section-shell__content install-section__content">
        <h2 class="section-shell__title install-section__title">轻松安装</h2>
        <p class="section-shell__desc install-section__desc">
          一键安装不同版本的 Minecraft 游戏与 Forge、Fabric、NeoForge、Quilt 等模组加载器，省去手动配置的繁琐步骤。
        </p>

        <div class="modloader-grid">
          <div v-for="m in modloaders" :key="m.name" class="modloader-card">
            <img class="modloader-card__icon" :src="m.icon" :alt="m.name" />
            <span class="modloader-card__name">{{ m.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 第二屏吸附锚点：滚动 100vh 后（02 遮挡完成）停住，再滚才进下一节 -->
    <div class="install-section__snap-anchor" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.install-section {
  position: relative;
  height: 200vh; /* 两屏：第一屏遮挡过渡，第二屏离开进入下一节 */
  background-color: var(--feature-bg);
}

.install-section__inner {
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
.install-section__snap-anchor {
  position: absolute;
  top: 100vh;
  left: 0;
  width: 1px;
  height: 1px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* ===== Media（前后遮挡舞台） ===== */
.install-section__media {
  position: relative;
}

.install-img {
  display: block;
  width: 100%;
  height: auto;
}

/* 01：底层"旧窗口"，随滚动缩小变暗推远 */
.install-img--01 {
  position: relative;
  z-index: 1;
  will-change: transform, filter;
}

/* 02：上层"新窗口"，3D 翻出放大，覆盖 01 */
.install-img--02 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  will-change: transform, filter;
}

/* ===== Content ===== */
/* 布局复用全局 section-shell，仅覆盖标题主题色与描述下边距 */
.install-section .install-section__title {
  color: var(--feature-primary);
}

.install-section .install-section__desc {
  margin-bottom: 1.5rem;
}

/* ===== Modloader 小卡片 ===== */
.modloader-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.modloader-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--mdui-shape-corner-medium);
  background-color: rgb(var(--mdui-color-surface-container-lowest));
  box-shadow: var(--mdui-elevation-level1);
  transition:
    box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    transform var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.modloader-card:hover {
  box-shadow: var(--mdui-elevation-level3);
  transform: translateY(-2px);
}

.modloader-card__icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.modloader-card__name {
  font-size: var(--mdui-typescale-body-large-size);
  font-weight: 600;
  color: rgb(var(--mdui-color-on-background));
}

/* ===== 入场动画（一次性播放） ===== */
/* title/desc 入场由全局 section.css 提供 */
.install-section.is-active .modloader-card {
  animation: mdui-card-pop 0.7s var(--mdui-motion-easing-expo-out) 0.15s both;
}

.install-section.is-active .modloader-card:nth-child(2) {
  animation-delay: 0.25s;
}

.install-section.is-active .modloader-card:nth-child(3) {
  animation-delay: 0.35s;
}

.install-section.is-active .modloader-card:nth-child(4) {
  animation-delay: 0.45s;
}

@media (prefers-reduced-motion: reduce) {
  .install-section.is-active .modloader-card {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .install-section__inner {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .modloader-grid {
    text-align: left;
  }
}
</style>
