import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import 'vuetify/src/stylus/app.styl';

import Vuetify, {
  VApp, VMenu, VNavigationDrawer, VBtn, VForm, VTextField, VProgressCircular, VDialog, VExpansionPanel, VStepper
} from 'vuetify/lib';
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
    VDialog,
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
