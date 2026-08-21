<script setup lang="ts">
import { ref } from 'vue'
import AllDownloadsDialog from '../components/AllDownloadsDialog.vue'
import PasswordDialog from '../components/PasswordDialog.vue'
import { useDownload } from '../composables/useDownload'

const {
  passwordDialog,
  passwordRequest,
  quickDownload,
  closePasswordDialog,
  openPasswordTarget,
} = useDownload()
const allDownloadsOpen = ref(false)
</script>

<template>
  <section id="hero" class="hero snap-section" data-bg="#f9f9ff" data-primary="#415f91">
    <!-- 左：截图预览 -->
    <div class="hero__media">
      <img
        class="hero__preview-img"
        src="../assets/screenshots/main_page.webp"
        alt="HMCL 主界面截图"
      />
    </div>

    <!-- 右：文字 + Action -->
    <div class="hero__content">
      <h1 class="hero__title">
        Hello <span class="hero__title-primary">Minecraft</span> Launcher
      </h1>

      <p class="hero__subtitle">
        一个开源、免费、强大的 Minecraft 启动器。
        跨平台支持，简洁现代的界面，让你专注于游戏本身。
      </p>

      <div class="hero__actions">
        <MduiButton variant="filled" icon="download" @click="quickDownload">
          下载 HMCL
        </MduiButton>
        <MduiButton variant="outlined" icon="list" @click="allDownloadsOpen = true">
          所有下载
        </MduiButton>
      </div>
    </div>
  </section>

  <PasswordDialog
    :open="passwordDialog"
    :url="passwordRequest?.url ?? ''"
    :label="passwordRequest?.label ?? ''"
    @close="closePasswordDialog"
    @confirm="openPasswordTarget"
  />
  <AllDownloadsDialog :open="allDownloadsOpen" @close="allDownloadsOpen = false" />
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-height: 100vh;
  background-color: #f9f9ff;
}

/* ===== Left: Media ===== */
.hero__media {
  flex: 1 1 58%;
  min-width: 0;
}

.hero__preview-img {
  display: block;
  width: 100%;
  height: auto;
}

/* ===== Right: Content ===== */
.hero__content {
  flex: 1 1 42%;
  min-width: 0;
  text-align: left;
}

/* 标题：Minecraft 一词用主色，其余黑色 */
.hero__title {
  margin: 0 0 1rem;
  font-size: var(--mdui-typescale-display-medium-size);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: rgb(var(--mdui-color-on-background));
}

.hero__title-primary {
  color: #415f91;
}

.hero__subtitle {
  margin: 0 0 2rem;
  max-width: 40ch;
  font-size: var(--mdui-typescale-title-large-size);
  line-height: 1.5;
  color: rgb(var(--mdui-color-on-surface-variant));
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ===== 入场动画（一次性播放，由 App.vue 添加 .is-active 触发） ===== */
/* 大图：幕布揭开 + 缩放聚焦 */
.hero.is-active .hero__preview-img {
  animation: mdui-reveal-up 1s var(--mdui-motion-easing-expo-out) both;
}

/* 标题：上升显现 */
.hero.is-active .hero__title {
  animation: mdui-rise 0.9s var(--mdui-motion-easing-expo-out) 0.15s both;
}

/* 副标题：次层 */
.hero.is-active .hero__subtitle {
  animation: mdui-rise 0.9s var(--mdui-motion-easing-expo-out) 0.28s both;
}

/* 按钮：最后错峰 */
.hero.is-active .hero__actions {
  animation: mdui-rise 0.9s var(--mdui-motion-easing-expo-out) 0.4s both;
}

/* 尊重系统减少动效偏好 */
@media (prefers-reduced-motion: reduce) {
  .hero.is-active .hero__preview-img,
  .hero.is-active .hero__title,
  .hero.is-active .hero__subtitle,
  .hero.is-active .hero__actions {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .hero {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem;
  }

  .hero__content {
    text-align: center;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__title {
    font-size: var(--mdui-typescale-display-small-size);
  }

  .hero__subtitle {
    margin-left: auto;
    margin-right: auto;
    font-size: var(--mdui-typescale-body-large-size);
  }
}
</style>
