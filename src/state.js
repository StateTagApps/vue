import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "x-#stateTagAppVersion#",
    storage: stateTagApp.storage
});

Vue.use(Vuex);

const state = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    context: null,

    state: {
        msg: {en: "This text is inside state.js"}
    },

    getters: {
        $read: (state, getters) => (locator) => {
            return _.get(state, locator);
        },
    },

    actions: {
        setEventContext: ({commit, state}, value) => {
            commit("applyState", {locator: 'context', value})
        },

        write: ({commit, state}, payload) => {
            commit("applyState", payload);
        }
    },

    mutations: {
        applyState: function (state, payload) {
            _.set(state, payload.locator, payload.value)
        }
    }
});

state.watch(
    function (state) {
        return state.msg;
    },
    function (fresh, stale) {
        let log = 'msg was changed!'
        stateTagApp.log(log);
    }
);

export default state;