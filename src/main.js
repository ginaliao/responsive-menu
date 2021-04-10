import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faChevronDown, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faChevronDown, faChevronLeft, faChevronRight, faTimes)

createApp(App).mount('#app')
