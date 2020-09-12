import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "x-#stateTagAppVersion#",
    storage: sessionStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],

    state: {
        greeting: "Knock, knock..."
    },

    getters: {
        g: (state, getters) => (locator) => {
            return _.get(state, locator);
        },
    },

    mutations: {
        applyReset: function (state) {
            state.greeting = "Knock, knock...";
        },
    },

    actions: {
        reset: ({commit, state}, payload) => {
            commit("applyReset");
        }
    }
});
