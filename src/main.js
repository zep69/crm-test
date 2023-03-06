import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'
import VueGoodTablePlugin from 'vue-good-table-next';
//import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'vue-good-table/dist/vue-good-table.css'



const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueGoodTablePlugin);

new WaveUI(app, {
	// Some Wave UI options.
})

app.mount('#app')

