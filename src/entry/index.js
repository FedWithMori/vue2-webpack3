import '../less/variable.less';
import '../less/reset.less';
import Vue from 'vue';
import index from '../pages/index.vue';

new Vue({
  el: '#app',
  render: h => h(index)
})