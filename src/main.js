'use strict';

import Vue from 'vue/dist/vue.esm.js';
import 'semantic-ui-css/semantic.min.css';

import './scss/header.scss';
import './scss/main.scss';

import { volumeCtrl } from './volume';
import { playCtrl } from './play';
import { albumCtrl } from './album';

export var vueApp = new Vue({
  el: '#app',
  data: {
    audioCtx: new Audio(),
  },
  mixins: [volumeCtrl, playCtrl, albumCtrl],
});
