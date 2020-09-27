import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

stateTagApp['untouched'] = {
    msg: {
        en: "This text is inside state.",
        sp: "Este texto está dentro del estado.",
        fr: "Ce texte est à l'intérieur de l'état.",
    }
};

const vuexPersist = new VuexPersist({
    key: "x-#stateTagAppVersion#",
    storage: stateTagApp.storage
});

Vue.use(Vuex);

stateTagApp["state"] = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    context: null,

    state: {...stateTagApp['untouched']},

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
            Object.keys(stateTagApp['untouched'])
                .forEach((key, index) => {
                    state[key] = stateTagApp['untouched'][key];
                });
        }
    },

    mutations: {
        applyState: function (state, payload) {
            _.set(state, payload.locator, payload.value)
        }
    }
});

stateTagApp["state"].watch(
    function (state) {
        return state.msg;
    },
    function (fresh, stale) {
        let log = 'msg was changed!'
        stateTagApp.log(log);
    }
);

export default stateTagApp["state"];