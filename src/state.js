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
        applyMsg: function (state, payload) {
            state.msg = payload;
        }
    },

    actions: {
        setMsg: ({commit, state}, payload) => {
            commit("applyMsg", payload);
        }
    }
});

state.watch(
    function (state) {
        return state.msg;
    },
    function (fresh, stale) {
        let log = 'msg was changed!'
        console.log(log);
    }
);

export default state;