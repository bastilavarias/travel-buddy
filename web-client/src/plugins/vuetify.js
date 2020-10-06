import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#FF5722",
                secondary: "#313131",
                accent: "#1d4354",
            },
        },
    },
});