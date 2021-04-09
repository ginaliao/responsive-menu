import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faChevronLeft, faChevronRight, faTimes)

createApp(App).mount('#app')
