import '../../assets/less/reset.less';
import Vue from 'vue';
import home from '../../pages/home/home.vue';

new Vue({
  el: '#app',
  render: h => h(home)
})