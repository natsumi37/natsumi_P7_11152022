import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core"
import { faHouse, faPencil, faEnvelope, faThumbsUp, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faHouse, faPencil, faEnvelope, faFaceSmile, faThumbsUp, faRightFromBracket)

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(store).use(router).mount('#app')
