import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router.js";
import { createPinia } from "pinia";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.config.productionTip = false;

app.use(router);
app.use(createPinia());

app.mount("#app");
