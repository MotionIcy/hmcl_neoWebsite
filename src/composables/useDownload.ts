import { ref } from 'vue'
import {
  getDownloadLinks,
  prefetchDownloadLinks,
  detectPlatform,
  platformToFileKey,
} from '../api/download'

const linksLoaded = ref(false)

/** 页面加载时调用：预取下载链接（本地副本兜底，异步刷新远程最新） */
export async function initDownloads() {
  if (linksLoaded.value) return
  await prefetchDownloadLinks()
  linksLoaded.value = true
}

/** 点击"下载"按钮：取稳定版 + 当前系统对应格式，直接跳转 */
export async function quickDownload() {
  await initDownloads()
  const links = getDownloadLinks()
  const fileKey = platformToFileKey(detectPlatform())
  const item = links.stable[fileKey]
  window.open(item.url, '_blank', 'noopener,noreferrer')
}

export function useDownload() {
  return {
    linksLoaded,
    initDownloads,
    quickDownload,
  }
}
