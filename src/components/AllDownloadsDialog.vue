<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  getDownloadLinks,
  prefetchDownloadLinks,
  type DownloadKey,
  type FileKey,
  channelLabel,
} from '../api/download'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const links = ref(getDownloadLinks())
const refresh = ref(false)

const channel = ref<DownloadKey>('stable')
const fileKey = ref<FileKey>('exe')

const channels: { key: DownloadKey; desc: string }[] = [
  { key: 'stable', desc: '当前推荐版本' },
  { key: 'dev', desc: '体验最新功能' },
  { key: 'old', desc: '兼容旧环境' },
]

const files: { key: FileKey; label: string; hint: string }[] = [
  { key: 'exe', label: 'Windows', hint: '安装包 (.exe)' },
  { key: 'sh', label: 'Linux / macOS', hint: '启动脚本 (.sh)' },
  { key: 'jar', label: '跨平台', hint: 'Java 可执行 (.jar)' },
]

// 弹窗挂载/打开时也尝试刷新一次远程数据（有本地兜底，不阻塞展示）
onMounted(async () => {
  refresh.value = true
  try {
    links.value = await prefetchDownloadLinks()
  } finally {
    refresh.value = false
  }
})

const selected = computed(() => {
  const ch = links.value[channel.value]
  const item = ch[fileKey.value]
  return {
    version: ch.version,
    fileLabel: files.find((f) => f.key === fileKey.value)?.label ?? '',
    ...item,
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="dialog-overlay" @click.self="emit('close')">
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dl-title">
          <h2 id="dl-title" class="dialog__title">所有下载</h2>

          <!-- 一级：下载版本 -->
          <div class="dialog__section">
            <p class="dialog__section-label">下载版本</p>
            <div class="dialog__chips">
              <button
                v-for="c in channels"
                :key="c.key"
                class="chip"
                :class="{ 'chip--active': channel === c.key }"
                @click="channel = c.key"
              >
                <span class="chip__label">{{ channelLabel(c.key) }}</span>
                <span class="chip__desc">{{ c.desc }}</span>
              </button>
            </div>
          </div>

          <!-- 二级：操作系统 -->
          <div class="dialog__section">
            <p class="dialog__section-label">操作系统</p>
            <div class="dialog__chips">
              <button
                v-for="f in files"
                :key="f.key"
                class="chip"
                :class="{ 'chip--active': fileKey === f.key }"
                @click="fileKey = f.key"
              >
                <span class="chip__label">{{ f.label }}</span>
                <span class="chip__desc">{{ f.hint }}</span>
              </button>
            </div>
          </div>

          <!-- 结果 -->
          <div class="dialog__result">
            <template v-if="refresh">
              <p class="dialog__result-placeholder">正在刷新最新版本…</p>
            </template>
            <p class="dialog__result-title">
              {{ channelLabel(channel) }} · {{ selected.fileLabel }}
            </p>
            <p class="dialog__result-version">
              版本 {{ selected.version }}
            </p>
            <p class="dialog__result-sha">SHA256：{{ selected.sha256 }}</p>
            <div class="dialog__actions">
              <MduiButton
                variant="filled"
                icon="open_in_new"
                :href="selected.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                访问下载链接
              </MduiButton>
            </div>
          </div>

          <div class="dialog__actions dialog__actions--footer">
            <MduiButton variant="text" @click="emit('close')">关闭</MduiButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.45);
}

.dialog {
  width: 100%;
  max-width: 30rem;
  max-height: 85vh;
  overflow-y: auto;
  padding: 1.5rem;
  border-radius: var(--mdui-shape-corner-large);
  background-color: rgb(var(--mdui-color-surface-container-high));
  color: rgb(var(--mdui-color-on-surface));
  box-shadow: var(--mdui-elevation-level3);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.dialog__title {
  margin: 0;
  font-size: var(--mdui-typescale-headline-small-size);
  font-weight: var(--mdui-typescale-headline-small-weight);
  line-height: var(--mdui-typescale-headline-small-line-height);
}

.dialog__section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialog__section-label {
  margin: 0;
  font-size: var(--mdui-typescale-label-large-size);
  font-weight: 600;
  color: rgb(var(--mdui-color-on-surface-variant));
}

.dialog__chips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid rgb(var(--mdui-color-outline-variant));
  border-radius: var(--mdui-shape-corner-medium);
  background-color: rgb(var(--mdui-color-surface-container-lowest));
  color: rgb(var(--mdui-color-on-surface-variant));
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition:
    border-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    background-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard),
    color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.chip--active {
  border-color: rgb(var(--mdui-color-primary));
  background-color: rgb(var(--mdui-color-primary-container));
  color: rgb(var(--mdui-color-on-primary-container));
}

.chip__label {
  font-size: var(--mdui-typescale-label-large-size);
  font-weight: 600;
}

.chip__desc {
  font-size: var(--mdui-typescale-body-small-size);
  opacity: 0.8;
}

.dialog__result {
  padding: 1rem;
  border-radius: var(--mdui-shape-corner-medium);
  background-color: rgb(var(--mdui-color-surface-container-lowest));
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dialog__result-placeholder {
  margin: 0 0 0.25rem;
  font-size: var(--mdui-typescale-body-medium-size);
  color: rgb(var(--mdui-color-on-surface-variant));
}

.dialog__result-title {
  margin: 0;
  font-size: var(--mdui-typescale-title-medium-size);
  font-weight: 600;
  color: rgb(var(--mdui-color-on-surface));
}

.dialog__result-version {
  margin: 0;
  font-size: var(--mdui-typescale-body-medium-size);
  color: rgb(var(--mdui-color-on-surface-variant));
}

.dialog__result-sha {
  margin: 0;
  font-size: var(--mdui-typescale-body-small-size);
  word-break: break-all;
  color: rgb(var(--mdui-color-on-surface-variant));
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.dialog__actions--footer {
  margin-top: 0;
}

/* ===== Dialog 过渡 ===== */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s var(--mdui-motion-easing-standard);
}
.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: transform 0.25s var(--mdui-motion-easing-emphasized-decelerate);
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: scale(0.92);
}

/* ===== Responsive ===== */
@media (max-width: 480px) {
  .dialog__chips {
    grid-template-columns: 1fr;
  }
}
</style>
