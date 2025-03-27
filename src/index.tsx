import { root } from '@lynx-js/react'
import './styles/Fonts.css' // Import our font definitions

import { App } from './App.js'

root.render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
