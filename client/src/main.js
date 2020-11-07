import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Restaurant from './components/Restaurant'
import DetailRestaurant from './components/DetailRestaurant'

Vue.config.productionTip = false
Vue.use(VueRouter);

// definition de route
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Restaurant
    },
    {
      path: '/restaurant/:id',
      component: DetailRestaurant
    }
  ],
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
