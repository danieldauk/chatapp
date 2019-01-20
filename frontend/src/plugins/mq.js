import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    sm: 666,
    lg: Infinity
  }
});
