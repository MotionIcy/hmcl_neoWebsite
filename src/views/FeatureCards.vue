<script setup lang="ts">
import type { FeatureCard } from '../data/sections'
import SiteFooter from './SiteFooter.vue'

defineProps<{
  cards: FeatureCard[]
}>()
</script>

<template>
  <section id="cards" class="feature-cards snap-section" data-bg="#f9f9ff" data-primary="#415f91">
    <div class="feature-cards__inner">
      <div class="feature-cards__row">
        <div v-for="c in cards" :key="c.title" class="feature-card">
          <span class="feature-card__icon">
            <MduiIcon :name="c.icon" />
          </span>
          <h3 class="feature-card__title">{{ c.title }}</h3>
          <p class="feature-card__desc">{{ c.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 页脚：融入最后一屏，滚动到底即可看到 -->
    <SiteFooter />
  </section>
</template>

<style scoped>
.feature-cards {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(var(--mdui-color-background));
}

.feature-cards__inner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  width: 100%;
}

.feature-cards__row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  flex: 1 1 260px;
  max-width: 320px;
  padding: 2.5rem 2rem;
  border-radius: var(--mdui-shape-corner-large);
  background-color: rgb(var(--mdui-color-surface-container-lowest));
  box-shadow: var(--mdui-elevation-level1);
}

.feature-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--mdui-shape-corner-full);
  background-color: rgb(var(--mdui-color-primary-container));
  color: rgb(var(--mdui-color-on-primary-container));
  font-size: 1.75rem;
}

.feature-card__title {
  margin: 0;
  font-size: var(--mdui-typescale-title-large-size);
  font-weight: 700;
  color: rgb(var(--mdui-color-on-background));
}

.feature-card__desc {
  margin: 0;
  font-size: var(--mdui-typescale-body-medium-size);
  line-height: 1.6;
  color: rgb(var(--mdui-color-on-surface-variant));
}

/* ===== 入场动画（一次性播放，阶梯错峰） ===== */
.feature-cards.is-active .feature-card:nth-child(1) {
  animation: mdui-card-in 0.7s var(--mdui-motion-easing-expo-out) both;
}

.feature-cards.is-active .feature-card:nth-child(2) {
  animation: mdui-card-in 0.7s var(--mdui-motion-easing-expo-out) 0.12s both;
}

.feature-cards.is-active .feature-card:nth-child(3) {
  animation: mdui-card-in 0.7s var(--mdui-motion-easing-expo-out) 0.24s both;
}

/* 卡片：上浮 + 从底部收起展开 */
@keyframes mdui-card-in {
  0% {
    opacity: 0;
    transform: translateY(36px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 尊重系统减少动效偏好 */
@media (prefers-reduced-motion: reduce) {
  .feature-cards.is-active .feature-card {
    animation: none;
  }
}
</style>
