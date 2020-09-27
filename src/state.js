import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "x-#stateTagAppVersion#",
    storage: stateTagApp.storage
});

Vue.use(Vuex);

stateTagApp["vuex"] = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    context: null,

    state: {...stateTagApp["state"]},

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
        },

        reset: ({commit, state}, payload) => {
            Object.keys(stateTagApp["state"])
                .forEach((key, index) => {
                    commit("applyState", {locator: key, value: stateTagApp["state"][key]});
                });
        }
    },

    mutations: {
        applyState: function (state, payload) {
            _.set(state, payload.locator, payload.value)
        }
    }
});

stateTagApp["vuex"].watch(
    function (state) {
        return state.msg.en;
    },
    function (fresh, stale) {
        let log = 'English msg was changed!'
        stateTagApp.log(log);
    }
);

stateTagApp["vuex"].watch(
    function (state) {
        return state.msg.sp;
    },
    function (fresh, stale) {
        let log = 'Spanish msg was changed!'
        stateTagApp.log(log);
    }
);

export default stateTagApp["vuex"];