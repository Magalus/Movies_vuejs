import Vue from 'vue' //librairie "vue" dans node_modules
import app from './app.vue' //fichier app.vue local
import home from './components/home.vue'
import form from './components/form.vue'
import edit from './components/edit.vue'
import detail from './components/detail.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'

Vue.use(VueRouter);

// Construction des différentes routes du site

const routes = [
  { path: '', component: home },
  { path: '/', component: home },
  { path: '/home', component: home },
  { path: '/form', component: form},
  { path: '/movie/:id/edit', component: edit },
  { path: '/movie/:id', component: detail}
]

const router = new VueRouter({
  routes
})

Axios.defaults.baseURL = "http://localhost:3000/";

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
