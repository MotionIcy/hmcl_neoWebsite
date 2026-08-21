<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  open: boolean
  url: string
  label: string
}>()

const emit = defineEmits<{
  close: []
  confirm: [url: string]
}>()

const password = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(
  () => props.open,
  (open) => {
    if (open) {
      password.value = ''
      nextTick(() => inputRef.value?.focus())
    }
  },
)

function onConfirm() {
  if (!password.value.trim()) return
  const sep = props.url.includes('?') ? '&' : '?'
  emit('confirm', `${props.url}${sep}password=${encodeURIComponent(password.value.trim())}`)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="dialog-overlay" @click.self="emit('close')">
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="pwd-title">
          <h2 id="pwd-title" class="dialog__title">下载需要密码</h2>
          <p class="dialog__content">
            您正在下载 <strong>{{ label }}</strong>。<br />
            该版本需输入下载密码后跳转。
          </p>
          <input
            ref="inputRef"
            v-model="password"
            class="dialog__input"
            type="password"
            placeholder="请输入下载密码"
            @keyup.enter="onConfirm"
          />
          <div class="dialog__actions">
            <MduiButton variant="text" @click="emit('close')">取消</MduiButton>
            <MduiButton variant="filled" :disabled="!password.trim()" @click="onConfirm">
              确认下载
            </MduiButton>
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
  max-width: 24rem;
  padding: 1.5rem;
  border-radius: var(--mdui-shape-corner-large);
  background-color: rgb(var(--mdui-color-surface-container-high));
  color: rgb(var(--mdui-color-on-surface));
  box-shadow: var(--mdui-elevation-level3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dialog__title {
  margin: 0;
  font-size: var(--mdui-typescale-headline-small-size);
  font-weight: var(--mdui-typescale-headline-small-weight);
  line-height: var(--mdui-typescale-headline-small-line-height);
}

.dialog__content {
  margin: 0;
  font-size: var(--mdui-typescale-body-medium-size);
  line-height: 1.6;
  color: rgb(var(--mdui-color-on-surface-variant));
}

.dialog__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(var(--mdui-color-outline));
  border-radius: var(--mdui-shape-corner-extra-small);
  background-color: rgb(var(--mdui-color-surface-container-highest));
  color: rgb(var(--mdui-color-on-surface));
  font-family: inherit;
  font-size: var(--mdui-typescale-body-large-size);
  outline: none;
  transition: border-color var(--mdui-motion-duration-short4) var(--mdui-motion-easing-standard);
}

.dialog__input:focus {
  border-color: rgb(var(--mdui-color-primary));
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
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
</style>
