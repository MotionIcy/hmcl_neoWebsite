# MDUI Vue 组件开发指南

## 目录结构

```
src/components/mdui/
├── theme/
│   ├── theme.css          # 全局设计令牌（颜色、排版、动效、阴影、圆角）
│   ├── useTheme.ts        # 主题管理（预留）
│   ├── useColorScheme.ts  # Hex → 完整 M3 配色方案
│   └── useRipple.ts       # 涟漪效果 composable
├── MduiButton.vue         # 按钮
├── MduiIcon.vue           # 图标
├── MduiIconButton.vue     # 图标按钮
├── MduiTopAppBar.vue      # 顶栏
├── MduiTopAppBarTitle.vue # 顶栏标题
└── index.ts               # 插件入口
```

## 全局注册

组件通过插件方式在 `main.ts` 中统一注册：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Mdui from './components/mdui'

createApp(App).use(Mdui).mount('#app')
```

注册后所有 MDUI 组件可在任意 `.vue` 文件中直接使用，无需手动 import：

```vue
<template>
  <MduiButton variant="filled">按钮</MduiButton>
  <MduiIcon name="home" />
</template>
```

## 新增组件规范

### 1. 文件位置

在 `src/components/mdui/` 下新建 `MduiXxx.vue`。

### 2. 命名规则

- 文件名：`Mdui` + PascalCase，如 `MduiCard.vue`
- CSS 类名前缀：`.mdui-xxx`，如 `.mdui-card`
- 提供 `defineName` 以便插件注册：组件默认使用文件名作为全局组件名

### 3. 组件模板

```vue
<template>
  <div class="mdui-xxx" :class="variantClasses" :style="colorStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  generateColorScheme,
  colorSchemeToStyle,
} from './theme/useColorScheme'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'alternative'
    color?: string
  }>(),
  {
    variant: 'default',
  },
)

const colorStyle = computed(() => {
  if (!props.color) return {}
  const scheme = generateColorScheme(props.color)
  return colorSchemeToStyle(scheme)
})
</script>

<style scoped>
.mdui-xxx {
  /* ... */
}
</style>
```

### 4. 注册到插件

在 `index.ts` 中：

```ts
import MduiXxx from './MduiXxx.vue'

export { MduiXxx }

const components = [
  // ...existing
  MduiXxx,
]
```

## 设计令牌使用

所有视觉属性通过 CSS 变量引用，**不要硬编码色值**。

### 颜色

```css
/* 正确 */
color: rgb(var(--mdui-color-primary));
background-color: rgb(var(--mdui-color-surface));
/* 带透明度 */
background-color: rgba(var(--mdui-color-on-surface), 0.12);
```

### 排版

```css
font-size: var(--mdui-typescale-label-large-size);
font-weight: var(--mdui-typescale-label-large-weight);
line-height: var(--mdui-typescale-label-large-line-height);
letter-spacing: var(--mdui-typescale-label-large-tracking);
```

### 阴影

```css
box-shadow: var(--mdui-elevation-level1);
box-shadow: var(--mdui-elevation-level2);
```

### 圆角

```css
border-radius: var(--mdui-shape-corner-full);
border-radius: var(--mdui-shape-corner-medium);
```

### 动效

```css
transition: box-shadow var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
transition-duration: var(--mdui-motion-duration-medium2);
```

### 状态层

```css
/* hover */
background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-hover));
/* focus */
background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-focus));
/* pressed */
background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-pressed));
```

## 涟漪效果

可交互组件（按钮、列表项等）使用 `useRipple` composable：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRipple } from './theme/useRipple'

const elRef = ref<HTMLElement | null>(null)
useRipple(elRef)
</script>

<template>
  <div ref="elRef" class="mdui-xxx">
    <slot />
  </div>
</template>

<style scoped>
.mdui-xxx {
  position: relative;
  overflow: hidden;
}
.mdui-xxx :deep(.mdui-ripple) {
  background-color: rgb(var(--mdui-ripple-color, var(--mdui-color-on-surface)));
}
</style>
```

要点：
- 宿主元素必须 `position: relative; overflow: hidden`
- 通过 `--mdui-ripple-color` CSS 变量控制涟漪颜色
- 涟漪动画 keyframe 已在 `theme.css` 全局定义

## 自定义颜色

每个组件都支持 `color` prop（Hex 值），传入后自动生成完整 M3 配色：

```vue
<MduiButton variant="filled" color="#E91E63">Pink</MduiButton>
```

实现方式：

```ts
import { generateColorScheme, colorSchemeToStyle } from './theme/useColorScheme'

const colorStyle = computed(() => {
  if (!props.color) return {}
  return colorSchemeToStyle(generateColorScheme(props.color))
})
```

## 设计令牌速查

| 令牌 | 变量 |
|------|------|
| primary | `--mdui-color-primary` |
| primary-container | `--mdui-color-primary-container` |
| on-primary | `--mdui-color-on-primary` |
| on-primary-container | `--mdui-color-on-primary-container` |
| secondary | `--mdui-color-secondary` |
| secondary-container | `--mdui-color-secondary-container` |
| on-secondary | `--mdui-color-on-secondary` |
| on-secondary-container | `--mdui-color-on-secondary-container` |
| surface | `--mdui-color-surface` |
| surface-container | `--mdui-color-surface-container` |
| surface-container-low | `--mdui-color-surface-container-low` |
| surface-container-high | `--mdui-color-surface-container-high` |
| surface-container-highest | `--mdui-color-surface-container-highest` |
| on-surface | `--mdui-color-on-surface` |
| on-surface-variant | `--mdui-color-on-surface-variant` |
| outline | `--mdui-color-outline` |
| outline-variant | `--mdui-color-outline-variant` |
| error | `--mdui-color-error` |
| shadow | `--mdui-color-shadow` |
| background | `--mdui-color-background` |
| on-background | `--mdui-color-on-background` |

| 排版 | 变量 |
|------|------|
| display-large | `--mdui-typescale-display-large-{size,weight,line-height,tracking}` |
| headline-large | `--mdui-typescale-headline-large-{size,weight,line-height,tracking}` |
| headline-medium | `--mdui-typescale-headline-medium-{size,weight,line-height,tracking}` |
| headline-small | `--mdui-typescale-headline-small-{size,weight,line-height,tracking}` |
| title-large | `--mdui-typescale-title-large-{size,weight,line-height,tracking}` |
| title-medium | `--mdui-typescale-title-medium-{size,weight,line-height,tracking}` |
| title-small | `--mdui-typescale-title-small-{size,weight,line-height,tracking}` |
| label-large | `--mdui-typescale-label-large-{size,weight,line-height,tracking}` |
| body-large | `--mdui-typescale-body-large-{size,weight,line-height,tracking}` |
| body-medium | `--mdui-typescale-body-medium-{size,weight,line-height,tracking}` |

| 动效 | 变量 |
|------|------|
| short1–4 | `--mdui-motion-duration-short{1-4}` |
| medium1–4 | `--mdui-motion-duration-medium{1-4}` |
| long1–4 | `--mdui-motion-duration-long{1-4}` |
| standard | `--mdui-motion-easing-standard` |
| emphasize | `--mdui-motion-easing-emphasized` |
| linear | `--mdui-motion-easing-linear` |

| 其他 | 变量 |
|------|------|
| 圆角 | `--mdui-shape-corner-{none,extra-small,small,medium,large,extra-large,full}` |
| 阴影 | `--mdui-elevation-{level0~level5}` |
| 状态层 | `--mdui-state-layer-{hover,focus,pressed,dragged}` |
