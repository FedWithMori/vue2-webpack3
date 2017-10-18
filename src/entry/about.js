import '../assets/less/reset.less';
import Vue from 'vue';
import about from '../pages/about.vue';

new Vue({
  el: '#app',
  render: h => h(about)
})