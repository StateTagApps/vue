import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "x-#stateTagAppVersion#",
    storage: sessionStorage
});

Vue.use(Vuex);

const state = new Vuex.Store({
    plugins: [vuexPersist.plugin],

    state: {
        msg: {en: "This text is inside state.js"}
    },

    getters: {
        $state: (state, getters) => (locator) => {
            return _.get(state, locator);
        },
    },

    mutations: {
        applyGreeting: function (state, payload) {
            state.greeting = payload;
        },

        applyReset: function (state) {
            state.greeting = "Knock, knock...";
        },
    },

    actions: {
        greet: ({commit, state}, payload) => {
            commit("applyGreeting", payload);
        },

        reset: ({commit, state}, payload) => {
            commit("applyReset");
        }
    }
});

state.watch(
    function (state) {
        return state.greeting;
    },
    function (fresh, stale) {
        let log = 'greeting was changed from '
            .concat(stale)
            .concat(' to ')
            .concat(fresh);

        console.log(log);
    }
);

export default state;