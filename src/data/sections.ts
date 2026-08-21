export interface FeatureCard {
  icon: string
  title: string
  desc: string
}

export const featureCards: FeatureCard[] = [
  {
    icon: 'code',
    title: '开源',
    desc: '代码完全开源，社区驱动，欢迎任何人参与贡献代码或提出建议。',
  },
  {
    icon: 'devices',
    title: '跨平台',
    desc: '支持 Windows、Linux、macOS、FreeBSD \n同时也支持 x86、ARM、RISC-V、MIPS、LoongArch 等不同的 CPU 架构',
  },
  {
    icon: 'wifi_off',
    title: '离线可用',
    desc: '无网环境下也可正常启动与游玩已安装的游戏。',
  },
]
