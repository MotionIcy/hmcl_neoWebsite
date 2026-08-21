import { ref } from 'vue'
import {
  getDownloadLinks,
  prefetchDownloadLinks,
  detectPlatform,
  platformToFileKey,
} from '../api/download'

interface PasswordRequest {
  url: string
  label: string
}

const linksLoaded = ref(false)
const passwordDialog = ref(false)
const passwordRequest = ref<PasswordRequest | null>(null)

/** 页面加载时调用：预取下载链接（本地副本兜底，异步刷新远程最新） */
export async function initDownloads() {
  if (linksLoaded.value) return
  await prefetchDownloadLinks()
  linksLoaded.value = true
}

/**
 * 点击"下载"按钮：取稳定版 + 当前系统对应格式。
 * Windows 弹密码框，其余平台直接跳转。
 */
export async function quickDownload() {
  await initDownloads()
  const links = getDownloadLinks()
  const fileKey = platformToFileKey(detectPlatform())
  const item = links.stable[fileKey]
  const label = `稳定版 · ${fileKey === 'exe' ? 'Windows 安装包' : fileKey === 'sh' ? '启动脚本' : '跨平台 JAR'}`
  if (detectPlatform() === 'windows') {
    passwordRequest.value = { url: item.url, label }
    passwordDialog.value = true
  } else {
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }
}

export function closePasswordDialog() {
  passwordDialog.value = false
}

export function openPasswordTarget(url: string) {
  passwordDialog.value = false
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function useDownload() {
  return {
    linksLoaded,
    passwordDialog,
    passwordRequest,
    initDownloads,
    quickDownload,
    closePasswordDialog,
    openPasswordTarget,
  }
}
