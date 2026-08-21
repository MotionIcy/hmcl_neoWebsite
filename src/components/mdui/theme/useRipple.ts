import { onMounted, onUnmounted, type Ref } from 'vue'

export function useRipple(elRef: Ref<HTMLElement | null>) {
  let el: HTMLElement | null = null

  function createRipple(event: MouseEvent) {
    if (!el) return

    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.className = 'mdui-ripple'
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      animation: mdui-ripple-anim 0.7s var(--mdui-motion-easing-standard) forwards;
    `

    el.appendChild(ripple)

    ripple.addEventListener('animationend', () => {
      ripple.remove()
    })
  }

  onMounted(() => {
    el = elRef.value
    if (el) el.addEventListener('click', createRipple)
  })

  onUnmounted(() => {
    if (el) el.removeEventListener('click', createRipple)
  })
}
