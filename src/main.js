import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import JwPagination from "jw-vue-pagination";
import VueEllipseProgress from "vue-ellipse-progress";
import { VueEditor } from "vue2-editor";


import Vuelidate from "vuelidate";Vue.config.productionTip = false;
library.add(fas, far, fab);
Vue.use( Vuelidate, "jw-pagination", JwPagination);
Vue.component(
  "FontAwesome",
  FontAwesomeIcon,
  "jw-pagination",
  JwPagination,
  VueEllipseProgress,
  VueEditor
);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");