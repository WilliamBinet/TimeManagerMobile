import Vue from 'nativescript-vue'
import App from './components/App'
import axios from 'axios'

import VueDevtools from 'nativescript-vue-devtools'


if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

const appSettings = require("application-settings");
const token = appSettings.getString('jwt');
if (token ===! '') {
  axios.defaults.headers.common['Authorization'] = token;
}

new Vue({
  
  render: h => h('frame', [h(App)])
}).$start()
