<script setup lang="ts">
import mainPageImg from '../../assets/screenshots/main_page.webp'

defineProps<{
  bg: string
  primary: string
  title: string
  desc: string
  flip?: boolean
  imgSrc?: string
}>()
</script>

<template>
  <section
    class="feature-section snap-section"
    :data-bg="bg"
    :data-primary="primary"
    :style="{ '--feature-bg': bg, '--feature-primary': primary }"
  >
    <div
      class="feature-section__inner"
      :class="{ 'feature-section__inner--reverse': flip }"
    >
      <div class="feature-section__media">
        <img
          class="feature-section__img"
          :src="imgSrc || mainPageImg"
          :alt="title"
        />
      </div>
      <div class="feature-section__content">
        <h2 class="feature-section__title">{{ title }}</h2>
        <p class="feature-section__desc">{{ desc }}</p>
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-section {
  background-color: var(--feature-bg);
}

.feature-section__inner {
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  min-height: 100vh;
}

.feature-section__inner--reverse {
  flex-direction: row-reverse;
}

/* ===== Media ===== */
.feature-section__media {
  flex: 1 1 55%;
  min-width: 0;
}

.feature-section__img {
  display: block;
  width: 100%;
  height: auto;
}

/* ===== Content ===== */
.feature-section__content {
  flex: 1 1 45%;
  min-width: 0;
  text-align: left;
}

/* 标题：整词用主色 */
.feature-section__title {
  margin: 0 0 1rem;
  font-size: var(--mdui-typescale-headline-large-size);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--feature-primary);
}

.feature-section__desc {
  margin: 0;
  max-width: 42ch;
  font-size: var(--mdui-typescale-body-large-size);
  line-height: 1.7;
  color: rgb(var(--mdui-color-on-surface-variant));
}

/* ===== 入场动画（一次性播放，由 App.vue 添加 .is-active 触发） ===== */
/* 图片：幕布向上揭开 + 轻微缩放聚焦 */
.feature-section.is-active .feature-section__img {
  animation: mdui-reveal-up 0.9s var(--mdui-motion-easing-expo-out) both;
}

/* 标题：先上浮清晰显现 */
.feature-section.is-active .feature-section__title {
  animation: mdui-rise 0.8s var(--mdui-motion-easing-expo-out) 0.12s both;
}

/* 描述：次层跟随 */
.feature-section.is-active .feature-section__desc {
  animation: mdui-rise 0.8s var(--mdui-motion-easing-expo-out) 0.24s both;
}

/* 幕布揭示：从下往上揭开 + 放大聚焦 */
@keyframes mdui-reveal-up {
  0% {
    opacity: 0;
    clip-path: inset(12% 0 100% 0);
    transform: scale(1.08);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    transform: scale(1);
  }
}

/* 上浮：带一点横向位移动感 */
@keyframes mdui-rise {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 尊重系统减少动效偏好 */
@media (prefers-reduced-motion: reduce) {
  .feature-section.is-active .feature-section__img,
  .feature-section.is-active .feature-section__title,
  .feature-section.is-active .feature-section__desc {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .feature-section__inner {
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem 1.5rem;
    min-height: auto;
  }

  .feature-section__inner--reverse {
    flex-direction: column;
  }

  .feature-section__content {
    text-align: center;
  }

  .feature-section__desc {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
