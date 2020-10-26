import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import CarteRestaurant from './components/CarteRestaurant'
import DetailRestaurant from './components/DetailRestaurant'

Vue.config.productionTip = false
Vue.use(VueRouter);

// definition de route
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: CarteRestaurant
    },
    {
      path: '/restaurant/:id',
      component: DetailRestaurant
    }
  ],
  mode: 'history'
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
