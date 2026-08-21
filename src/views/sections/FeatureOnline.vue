<script setup lang="ts">
import img01 from '../../assets/screenshots/play_with_friends/01.webp'
</script>

<template>
  <section
    id="online"
    class="online-section snap-section"
    data-bg="#fff8f6"
    data-primary="#8f4c38"
  >
    <div class="section-shell online-section__inner">
      <!-- 左：内容区域 -->
      <div class="section-shell__content online-section__content">
        <h2 class="section-shell__title online-section__title">轻松联机</h2>
        <p class="section-shell__desc online-section__desc">
          内置陶瓦联机，跨启动器支持，无需复杂网络配置即可与好友一同游玩，畅享联机乐趣。
        </p>

        <!-- 网络连接图标动画 -->
        <div class="network-anim">
          <svg
            class="network-anim__svg"
            viewBox="0 0 220 220"
            fill="none"
            aria-hidden="true"
          >
            <!-- 连接线（上下左右，中心对称） -->
            <line class="network-anim__line" x1="110" y1="110" x2="110" y2="24" />
            <line class="network-anim__line" x1="110" y1="110" x2="110" y2="196" />
            <line class="network-anim__line" x1="110" y1="110" x2="24" y2="110" />
            <line class="network-anim__line" x1="110" y1="110" x2="196" y2="110" />
            <!-- 线上流动的光点 -->
            <circle class="network-anim__dot network-anim__dot--1" cx="0" cy="0" r="2.5" />
            <circle class="network-anim__dot network-anim__dot--2" cx="0" cy="0" r="2.5" />
            <circle class="network-anim__dot network-anim__dot--3" cx="0" cy="0" r="2.5" />
            <circle class="network-anim__dot network-anim__dot--4" cx="0" cy="0" r="2.5" />
          </svg>

          <!-- 中心枢纽 -->
          <div class="network-anim__center">
            <MduiIcon name="hub" class="network-anim__center-icon" />
            <span class="network-anim__pulse" />
            <span class="network-anim__pulse network-anim__pulse--delay" />
          </div>

          <!-- 四个用户节点（上下左右对称） -->
          <div class="network-anim__node network-anim__node--1">
            <MduiIcon name="person" class="network-anim__node-icon" />
          </div>
          <div class="network-anim__node network-anim__node--2">
            <MduiIcon name="person" class="network-anim__node-icon" />
          </div>
          <div class="network-anim__node network-anim__node--3">
            <MduiIcon name="person" class="network-anim__node-icon" />
          </div>
          <div class="network-anim__node network-anim__node--4">
            <MduiIcon name="person" class="network-anim__node-icon" />
          </div>
        </div>
      </div>

      <!-- 右：媒体区域 -->
      <div class="section-shell__media online-section__media">
        <div class="online-media">
          <img class="online-media__img" :src="img01" alt="Play With Friends" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.online-section {
  background-color: #fff8f6;
}

/* 标题颜色：复用全局 section-shell 布局，仅覆盖主题色 */
.online-section .online-section__title {
  color: #8f4c38;
}

/* ===== 网络连接动画（SVG 精确布局，中心对称） ===== */
.network-anim {
  position: relative;
  width: 220px;
  height: 220px;
}

.network-anim__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.network-anim__line {
  stroke: rgba(143, 76, 56, 0.28);
  stroke-width: 1.5;
  stroke-dasharray: 4 6;
  animation: line-flow 1.2s linear infinite;
}

/* 线条流光：向中心方向流动 */
.network-anim__line:nth-of-type(1) {
  animation-duration: 1.2s;
}
.network-anim__line:nth-of-type(2) {
  animation-duration: 1.2s;
}
.network-anim__line:nth-of-type(3) {
  animation-duration: 1.5s;
}
.network-anim__line:nth-of-type(4) {
  animation-duration: 1.5s;
}

@keyframes line-flow {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -20;
  }
}

/* 线上流动光点 */
.network-anim__dot {
  fill: #8f4c38;
  opacity: 0;
}

.network-anim__dot--1 {
  animation: dot-travel-1 1.2s linear infinite;
}
.network-anim__dot--2 {
  animation: dot-travel-2 1.2s linear infinite;
}
.network-anim__dot--3 {
  animation: dot-travel-3 1.5s linear infinite;
}
.network-anim__dot--4 {
  animation: dot-travel-4 1.5s linear infinite;
}

@keyframes dot-travel-1 {
  0% {
    offset-path: path('M 110 24 L 110 110');
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    offset-path: path('M 110 24 L 110 110');
    offset-distance: 100%;
    opacity: 0;
  }
}

@keyframes dot-travel-2 {
  0% {
    offset-path: path('M 110 196 L 110 110');
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    offset-path: path('M 110 196 L 110 110');
    offset-distance: 100%;
    opacity: 0;
  }
}

@keyframes dot-travel-3 {
  0% {
    offset-path: path('M 24 110 L 110 110');
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    offset-path: path('M 24 110 L 110 110');
    offset-distance: 100%;
    opacity: 0;
  }
}

@keyframes dot-travel-4 {
  0% {
    offset-path: path('M 196 110 L 110 110');
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    offset-path: path('M 196 110 L 110 110');
    offset-distance: 100%;
    opacity: 0;
  }
}

/* 中心枢纽 */
.network-anim__center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
}

.network-anim__center-icon {
  position: relative;
  z-index: 2;
  font-size: 1.375rem;
  width: 1.375rem;
  height: 1.375rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8f4c38;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 12px rgba(143, 76, 56, 0.2);
}

.network-anim__pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(143, 76, 56, 0.18);
  transform: translate(-50%, -50%) scale(1);
  animation: pulse-ring 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.network-anim__pulse--delay {
  animation-delay: 1.2s;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.4);
    opacity: 0;
  }
}

/* 四个用户节点（上下左右，中心对称） */
.network-anim__node {
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.network-anim__node--1 {
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.network-anim__node--2 {
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
.network-anim__node--3 {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.network-anim__node--4 {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.network-anim__node-icon {
  font-size: 0.875rem;
  width: 0.875rem;
  height: 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8f4c38;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 6px rgba(143, 76, 56, 0.15);
}

/* ===== Media ===== */
.online-section__media {
  flex: 1 1 55%;
  min-width: 0;
}

.online-media {
  border-radius: var(--mdui-shape-corner-medium);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(143, 76, 56, 0.15);
}

.online-media__img {
  display: block;
  width: 100%;
  height: auto;
}

/* ===== 入场动画 ===== */
/* title/desc 入场由全局 section.css 提供 */
.online-section.is-active .online-media {
  animation: mdui-reveal-up 1s var(--mdui-motion-easing-expo-out) 0.15s both;
}

.online-section.is-active .network-anim {
  animation: mdui-rise 0.7s var(--mdui-motion-easing-expo-out) 0.4s both;
}

.online-section.is-active .network-anim__center {
  animation: mdui-pop-center 0.5s var(--mdui-motion-easing-emphasized-decelerate) 0.5s both;
}

.online-section.is-active .network-anim__node--1 {
  animation: mdui-pop-node-top 0.5s var(--mdui-motion-easing-emphasized-decelerate) 0.6s both;
}

.online-section.is-active .network-anim__node--2 {
  animation: mdui-pop-node-bottom 0.5s var(--mdui-motion-easing-emphasized-decelerate) 0.6s both;
}

.online-section.is-active .network-anim__node--3 {
  animation: mdui-pop-node-left 0.5s var(--mdui-motion-easing-emphasized-decelerate) 0.7s both;
}

.online-section.is-active .network-anim__node--4 {
  animation: mdui-pop-node-right 0.5s var(--mdui-motion-easing-emphasized-decelerate) 0.7s both;
}

@keyframes mdui-pop-center {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes mdui-pop-node-top {
  from {
    opacity: 0;
    transform: translate(-50%, -40%) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

@keyframes mdui-pop-node-bottom {
  from {
    opacity: 0;
    transform: translate(-50%, 40%) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

@keyframes mdui-pop-node-left {
  from {
    opacity: 0;
    transform: translate(-40%, -50%) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translate(0, -50%) scale(1);
  }
}

@keyframes mdui-pop-node-right {
  from {
    opacity: 0;
    transform: translate(40%, -50%) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translate(0, -50%) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .online-section.is-active .online-section__title,
  .online-section.is-active .online-section__desc,
  .online-section.is-active .online-media,
  .online-section.is-active .network-anim,
  .online-section.is-active .network-anim__center,
  .online-section.is-active .network-anim__node--1,
  .online-section.is-active .network-anim__node--2,
  .online-section.is-active .network-anim__node--3,
  .online-section.is-active .network-anim__node--4 {
    animation: none;
  }

  .network-anim__line,
  .network-anim__dot {
    animation: none;
  }
}

/* ===== Responsive ===== */
@media (max-width: 720px) {
  .network-anim {
    margin: 0 auto;
  }
}
</style>
