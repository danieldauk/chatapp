import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import {
  VApp, VMenu, VNavigationDrawer, VBtn, VForm, VTextField, VProgressCircular, Vdialog, VExpansionPanel, VStepper
} from 'vuetify';
import { Resize } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  directives: {
    Resize
  },
  components: {
    VApp,
    VMenu,
    VNavigationDrawer,
    VTextField,
    VBtn,
    VForm,
    VProgressCircular,
    Vdialog,
    VExpansionPanel,
    VStepper
  },
  theme: {
    primary: '#dbdcf6',
    secondary: '#3b385d',
    accent: '#dbdcf6',
    error: '#f17271',
    warning: '#fffc75',
    info: '#dbdcf6',
    success: '#73d4bd'
  }
});
