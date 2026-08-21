import type { App, Plugin } from 'vue'
import MduiButton from './MduiButton.vue'
import MduiIcon from './MduiIcon.vue'
import MduiIconButton from './MduiIconButton.vue'
import MduiTopAppBar from './MduiTopAppBar.vue'
import MduiTopAppBarTitle from './MduiTopAppBarTitle.vue'

// 全局主题 CSS
import './theme/theme.css'

// 导出 composables
export { useTheme } from './theme/useTheme'
export { generateColorScheme, hexToRgb, rgbToHsl, getLuminance } from './theme/useColorScheme'
export type { ColorScheme } from './theme/useColorScheme'

// 导出组件
export { MduiButton, MduiIcon, MduiIconButton, MduiTopAppBar, MduiTopAppBarTitle }

const componentMap = {
  MduiButton,
  MduiIcon,
  MduiIconButton,
  MduiTopAppBar,
  MduiTopAppBarTitle,
}

const MduiPlugin: Plugin = {
  install(app: App) {
    for (const [name, comp] of Object.entries(componentMap)) {
      app.component(name, comp)
    }
  },
}

export default MduiPlugin
