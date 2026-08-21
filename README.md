# Icy的 HMCL 新官网
由才羽Icy（https://space.bilibili.com/3707047719733882） 制作，虽然大部分代码是AI写的，看起来比较潦草，像是VibeCoding出来的勾十（事实确实如此...），但是我还是花了不少时间去优化，希望Glavo猫猫喜欢♥️。

## 技术细节

- Vue 3 + TypeScript
- mdui 组件库（`src/components/mdui/`）：遵循Material Design 3 设计语言，虽然拿AI跑出来的(｡•́︿•̀｡)
- 下载功能实时请求 `https://hmcl.huangyuhui.net/api/download_link` 获取下载链接，如果请求失败则使用本地兜底数据。不过把城通网盘肘掉了，因为这个API根本没有指向网盘地址，而是Glavo官网直链(⁄ ⁄•⁄ω⁄•⁄ ⁄)
## 制作过程
本项目从8月初开始制作，不过一开始我技术并不强，后期投靠AI了，VibeCoding好爽喵(・ω・)ノ
不过也是因为VibeCoding和我这菜B技术，代码质量很差，效果距离我的预期有点距离，而且也可能发现有些代码比较迷惑，因为AI有时没有理解我的意思，导致代码写的很乱...提交前用AI润色了一遍
## 目录结构

```
src/
├── api/              # 外部数据接口（下载链接）
├── assets/           # 截图、图标等静态资源
├── components/
│   ├── mdui/         # 基础组件库（Button/Icon/TopAppBar/Ripple/主题）
│   └── ...           # 组件（侧边导航、下载弹窗等）
├── composables/      # 函数（下载逻辑等）
├── data/             # 数据（章节配置、下载链接副本）
├── styles/           # 全局共享样式（动画keyframes Section布局）
├── views/
│   └── sections/     # 章节组件
├── App.vue           # 根组件
└── main.ts

## 启动

```bash
pnpm install

# 开发
pnpm dev

# 构建
pnpm build
```