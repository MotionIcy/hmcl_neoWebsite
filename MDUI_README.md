# MDUI Vue

将 [MDUI (Material Design 3)](https://www.mdui.org/) 复刻为 Vue 3 组件库，用于开发。

## 快速开始

### 1. 引入 Material Icons 字体

在 `index.html` 的 `<head>` 中添加：

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone"
/>
```

### 2. 使用组件

```vue
<script setup lang="ts">
import MduiButton from '@/components/mdui/MduiButton.vue'
import MduiIcon from '@/components/mdui/MduiIcon.vue'
import MduiIconButton from '@/components/mdui/MduiIconButton.vue'
import MduiTopAppBar from '@/components/mdui/MduiTopAppBar.vue'
import MduiTopAppBarTitle from '@/components/mdui/MduiTopAppBarTitle.vue'
// 全局主题 CSS 只需引入一次
import '@/components/mdui/theme/theme.css'

</script>
```

或者作为插件全局注册：

```ts
import { createApp } from 'vue'
import Mdui from './components/mdui'
import App from './App.vue'

createApp(App).use(Mdui).mount('#app')
```

## 组件

### Button

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'filled' \| 'elevated' \| 'tonal' \| 'outlined' \| 'text'` | `'text'` | 按钮样式变体 |
| `fullWidth` | `boolean` | `false` | 是否撑满容器宽度 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载中状态 |
| `icon` | `string` | — | 左侧 Material Icon 名称 |
| `endIcon` | `string` | — | 右侧 Material Icon 名称 |
| `href` | `string` | — | 设置为链接按钮（渲染为 `<a>`） |
| `color` | `string` | — | 自定义主题色（Hex，如 `#E91E63`） |

| Slot | 说明 |
|------|------|
| `default` | 按钮文案 |
| `icon` | 左侧图标 |
| `end-icon` | 右侧图标 |

```vue
<!-- 五种变体 -->
<MduiButton variant="filled">Filled</MduiButton>
<MduiButton variant="elevated">Elevated</MduiButton>
<MduiButton variant="tonal">Tonal</MduiButton>
<MduiButton variant="outlined">Outlined</MduiButton>
<MduiButton variant="text">Text</MduiButton>

<!-- 带图标 -->
<MduiButton variant="filled" icon="download">下载</MduiButton>
<MduiButton variant="tonal" icon="favorite" end-icon="arrow_forward">Fav</MduiButton>

<!-- 全宽 -->
<MduiButton variant="filled" full-width>Full Width</MduiButton>

<!-- 禁用 -->
<MduiButton variant="filled" disabled>Disabled</MduiButton>

<!-- 加载中 -->
<MduiButton variant="filled" loading>Loading...</MduiButton>

<!-- 链接 -->
<MduiButton variant="filled" href="https://example.com">Link</MduiButton>

<!-- 自定义颜色 -->
<MduiButton variant="filled" color="#E91E63">Pink</MduiButton>
<MduiButton variant="tonal" color="#4CAF50">Green Tonal</MduiButton>
```

### Icon

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | — | 图标名称。支持变体语法：`home` (filled) / `home--outlined` / `home--rounded` / `home--sharp` / `home--two-tone` |

```vue
<MduiIcon name="home" />
<MduiIcon name="home--outlined" />
<MduiIcon name="home--rounded" />
<MduiIcon name="home--sharp" />
<MduiIcon name="favorite--two-tone" />
```

### IconButton

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'standard' \| 'filled' \| 'tonal' \| 'outlined'` | `'standard'` | 按钮样式变体 |
| `icon` | `string` | — | 显示的图标名称 |
| `selected` | `boolean` | `false` | 是否选中（需配合点击事件使用） |
| `selectedIcon` | `string` | — | 选中时显示的图标 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载中状态 |
| `color` | `string` | — | 自定义主题色 |

```vue
<!-- 四种变体 -->
<MduiIconButton icon="search" variant="standard" />
<MduiIconButton icon="favorite" variant="filled" />
<MduiIconButton icon="star" variant="tonal" />
<MduiIconButton icon="settings" variant="outlined" />

<!-- 可选中（切换图标） -->
<script setup>
const selected = ref(false)
</script>
<template>
  <MduiIconButton
    icon="favorite_border"
    selected-icon="favorite"
    variant="filled"
    :selected="selected"
    @click="selected = !selected"
  />
</template>

<!-- 自定义颜色 -->
<MduiIconButton icon="palette" variant="filled" color="#FF5722" />
```

### TopAppBar

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'small' \| 'center-aligned' \| 'medium' \| 'large'` | `'small'` | 顶栏样式变体 |
| `scrollBehavior` | `string` | — | 滚动行为，可选值：`hide` `shrink` `elevate`（可空格组合） |

| 变体 | 高度 | 标题样式 |
|------|------|----------|
| `small` | 64px | title-large（左对齐） |
| `center-aligned` | 64px | title-large（居中） |
| `medium` | 112px | headline-small（左下角大标题） |
| `large` | 152px | headline-medium（左下角大标题） |

```vue
<MduiTopAppBar variant="center-aligned" scroll-behavior="elevate">
  <MduiIconButton icon="menu" variant="standard" />
  <MduiTopAppBarTitle>标题</MduiTopAppBarTitle>
  <MduiIconButton icon="search" variant="standard" />
</MduiTopAppBar>

<!-- medium / large 变体支持大标题 slot -->
<MduiTopAppBar variant="medium">
  <MduiIconButton icon="arrow_back" variant="standard" />
  <MduiTopAppBarTitle>
    小标题
    <template #large>大标题</template>
  </MduiTopAppBarTitle>
</MduiTopAppBar>
```

> **注意**：TopAppBar 是 `position: fixed` 的，组件会自动渲染一个等高的占位 `<div>` 防止内容被遮挡。

## 主题系统

当前为纯亮色模式。

### 元素级自定义颜色

每个组件都支持 `color` prop，传入 Hex 色值即可为当前元素生成独立的配色方案（自动计算衍生颜色：primary-container、on-primary 等）：

```vue
<MduiButton variant="filled" color="#E91E63">Pink Button</MduiButton>
<MduiIconButton icon="favorite" variant="filled" color="#FF5722" />
```

### 配色系统

主题色使用 CSS 自定义属性实现，完全兼容 MDUI 的颜色令牌体系。颜色值以逗号分隔的 RGB 形式存储：

```css
--mdui-color-primary: 103, 80, 164;
--mdui-color-on-primary: 255, 255, 255;
--mdui-color-primary-container: 234, 221, 255;
/* ... 30+ 颜色令牌 */
```

可以通过覆盖 CSS 变量来自定义全局主题色：

```css
:root {
  --mdui-color-primary-light: 25, 118, 210;
  --mdui-color-on-primary-light: 255, 255, 255;
  /* ... */
}
```

## 设计令牌

| 类别 | CSS 变量前缀 | 说明 |
|------|-------------|------|
| 颜色 | `--mdui-color-*` | 完整 M3 颜色系统（亮色） |
| 排版 | `--mdui-typescale-*` | display/headline/title/label/body |
| 阴影 | `--mdui-elevation-*` | level0 ~ level5 |
| 圆角 | `--mdui-shape-corner-*` | none → full (0~16000px) |
| 动效 | `--mdui-motion-*` | easing + duration (short1 ~ extra-long4) |
| 状态层 | `--mdui-state-layer-*` | hover/focus/pressed/dragged 透明度 |

## 项目结构

```
src/components/mdui/
├── theme/
│   ├── theme.css          # 全局设计令牌（颜色、排版、动效、阴影、圆角等）
│   ├── useTheme.ts        # 主题模式管理 composable
│   └── useColorScheme.ts  # 种子色 → 完整 M3 配色方案生成
├── MduiButton.vue         # 按钮
├── MduiIcon.vue           # 图标
├── MduiIconButton.vue     # 图标按钮
├── MduiTopAppBar.vue      # 顶栏
├── MduiTopAppBarTitle.vue # 顶栏标题
└── index.ts               # 插件入口
```
