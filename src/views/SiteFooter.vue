<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="site-footer__copyright">
        &copy; 2025 huangyuhui. 保留所有权利。
      </p>

      <div class="site-footer__links">
        <!-- 工信部 ICP 备案：必须链接到 beian.miit.gov.cn -->
        <a
          class="site-footer__link"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          粤ICP备18071565号
        </a>

        <!-- 公安备案：链接到全国公安互联网站安全管理服务平台 -->
        <a
          class="site-footer__link"
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010502002149"
          target="_blank"
          rel="noopener noreferrer"
        >
          粤公网安备 44010502002149 号
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: rgb(var(--mdui-color-surface-container-low));
  border-top: 1px solid rgb(var(--mdui-color-outline-variant));
  padding: 2.5rem 1.5rem;
}

.site-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.site-footer__copyright {
  margin: 0;
  font-size: var(--mdui-typescale-body-medium-size);
  color: rgb(var(--mdui-color-on-surface-variant));
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1.5rem;
}

.site-footer__link {
  font-size: var(--mdui-typescale-body-small-size);
  color: rgb(var(--mdui-color-on-surface-variant));
  text-decoration: none;
  transition: color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.site-footer__link:hover {
  color: rgb(var(--mdui-color-primary));
  text-decoration: underline;
}
</style>
