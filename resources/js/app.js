import "./bootstrap.js";
import { createApp } from "vue";
import App from "./Vue/App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//vuetify icons
import "@mdi/font/css/materialdesignicons.css";

//Vue Router
import { router } from "./Vue/router/index.js";

//utilities
import './utilities/helper.js'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
    },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
