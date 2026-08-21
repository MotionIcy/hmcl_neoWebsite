<template>
  <span class="mdui-icon" :class="variantClass">
    <slot>
      {{ resolvedName }}
    </slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 图标名称，如 "home", "settings--filled", "search--outlined", "favorite--rounded" */
    name?: string
    /** 外部 SVG 地址 */
    src?: string
  }>(),
  {
    name: undefined,
    src: undefined,
  },
)

const variantFontMap: Record<string, string> = {
  outlined: "'Material Icons Outlined'",
  filled: "'Material Icons'",
  rounded: "'Material Icons Round'",
  sharp: "'Material Icons Sharp'",
  'two-tone': "'Material Icons Two Tone'",
}

const variantClass = computed(() => {
  if (!props.name) return ''
  const [, variant] = props.name.split('--')
  return variant && variantFontMap[variant]
    ? `mdui-icon--${variant}`
    : 'mdui-icon--filled'
})

const resolvedName = computed(() => {
  if (!props.name) return ''
  return props.name.split('--')[0]!
})

const fontFamily = computed(() => {
  if (!props.name) return ''
  const [, variant] = props.name.split('--')
  return variant && variantFontMap[variant]
    ? variantFontMap[variant]
    : "'Material Icons'"
})
</script>

<style scoped>
.mdui-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  font-weight: normal;
  font-style: normal;
  font-size: 1.5rem;
  line-height: 1;
  direction: ltr;
  letter-spacing: normal;
  white-space: nowrap;
  text-transform: none;
  word-wrap: normal;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

.mdui-icon--filled {
  font-family: 'Material Icons';
}

.mdui-icon--outlined {
  font-family: 'Material Icons Outlined';
}

.mdui-icon--rounded {
  font-family: 'Material Icons Round';
}

.mdui-icon--sharp {
  font-family: 'Material Icons Sharp';
}

.mdui-icon--two-tone {
  font-family: 'Material Icons Two Tone';
}

/* SVG support */
:slotted(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
