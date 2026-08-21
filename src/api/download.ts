// HMCL 下载链接
// 远程数据源：https://hmcl.huangyuhui.net/api/download_link （静态 JSON）
// 本地附带一份静态副本作为默认值，页面加载即可用；加载后尝试拉取远程最新版本覆盖。

import localLinks from '../data/download-links.json'

export interface DownloadItem {
  url: string
  sha256: string
}

export interface DownloadChannel {
  version: string
  jar: DownloadItem
  exe: DownloadItem
  sh: DownloadItem
}

export interface DownloadLinks {
  stable: DownloadChannel
  dev: DownloadChannel
  old: DownloadChannel
}

export type DownloadKey = 'stable' | 'dev' | 'old'
export type FileKey = 'jar' | 'exe' | 'sh'
export type Platform = 'windows' | 'macos' | 'linux' | 'other'

const API_URL = 'https://hmcl.huangyuhui.net/api/download_link'

let cached: DownloadLinks = localLinks as DownloadLinks

/** 页面加载时调用：先返回本地静态副本，同时异步拉取远程最新数据覆盖 */
export async function prefetchDownloadLinks(): Promise<DownloadLinks> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as DownloadLinks
    if (data?.stable && data?.dev && data?.old) cached = data
  } catch {
    // 远程不可用（如跨域）时静默保留本地副本
  }
  return cached
}

/** 获取当前可用的下载链接（始终有值，不会抛错） */
export function getDownloadLinks(): DownloadLinks {
  return cached
}

/** 检测当前操作系统 */
export function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('windows')) return 'windows'
  if (ua.includes('mac os')) return 'macos'
  if (ua.includes('linux')) return 'linux'
  return 'other'
}

/** 平台 -> 文件格式 */
export function platformToFileKey(p: Platform): FileKey {
  switch (p) {
    case 'windows':
      return 'exe'
    case 'macos':
    case 'linux':
      return 'sh'
    default:
      return 'jar'
  }
}

/** 文件格式 -> 展示名 */
export function fileKeyLabel(key: FileKey): string {
  switch (key) {
    case 'exe':
      return 'Windows 安装包 (.exe)'
    case 'sh':
      return 'Shell 启动脚本 (.sh)'
    default:
      return '跨平台 JAR (.jar)'
  }
}

/** 通道展示名 */
export function channelLabel(key: DownloadKey): string {
  switch (key) {
    case 'dev':
      return '开发版'
    case 'old':
      return '旧版本'
    default:
      return '稳定版'
  }
}
