import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import '@oruga-ui/theme-bulma/dist/bulma.css';
/* import the fontawesome core, icon component, and specific icons */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faDragon,
  faShield,
  faDungeon,
  faBiohazard,
  faFaceLaughSquint,
  faMasksTheater,
  faCarrot,
  faSkull,
  faWandMagicSparkles,
  faRobot,
  faMusic,
  faPuzzlePiece,
  faBrain,
  faHeart,
  faSatellite,
  faBreadSlice,
  faFootball,
  faGhost,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';

library.add(
  faDragon,
  faShield,
  faDungeon,
  faBiohazard,
  faFaceLaughSquint,
  faMasksTheater,
  faCarrot,
  faSkull,
  faWandMagicSparkles,
  faRobot,
  faMusic,
  faPuzzlePiece,
  faBrain,
  faHeart,
  faSatellite,
  faBreadSlice,
  faFootball,
  faGhost,
  faArrowDown,
  faArrowUp,
);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(Oruga, bulmaConfig).use(router)
  .mount('#app');
