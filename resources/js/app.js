import "./bootstrap.js";
import { createApp, markRaw } from "vue";
import App from "./Vue/App.vue";

//State manager
import { createPinia } from "pinia";

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
import "./utilities/helper.js";

const pinia = createPinia();

pinia.use(({ state }) => {
    return {
        router: markRaw(router),
    };
});

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
    },
});

const app = createApp(App);
app.use(pinia);
app.use(vuetify);
app.use(router);
app.mount("#app");
