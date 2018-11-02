import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import {
  VApp,
  VMenu,
  VNavigationDrawer,
  VBtn,
  VForm,
  VTextField,
  VProgressCircular,
} from 'vuetify';

Vue.use(Vuetify, {
  components: {
    VApp,
    VMenu,
    VNavigationDrawer,
    VTextField,
    VBtn,
    VForm,
    VProgressCircular,
  },
});
