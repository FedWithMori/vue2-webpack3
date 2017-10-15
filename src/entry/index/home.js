import '../../less/variable.less';
import '../../less/reset.less';
import Vue from 'vue';
import home from '../../pages/index/home.vue';

new Vue({
  el: '#app',
  render: h => h(home)
})