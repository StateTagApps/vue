stateTagApp['state'] = {
    msg: {
        en: "This text is inside state.",
            sp: "Este texto está dentro del estado.",
            fr: "Ce texte est à l'intérieur de l'état.",
    }
};

//-----------------------
import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "x-#stateTagAppVersion#",
    storage: stateTagApp.storage
});

Vue.use(Vuex);

stateTagApp["store"] = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    context: null,

    state: {...stateTagApp["state"]},

    getters: {
        $read: (state, getters) => (locus) => {
            return _.get(state, locus);
        },
    },

    actions: {
        setEventContext: ({commit, state}, value) => {
            commit("applyState", {locus: 'context', value})
        },

        write: ({commit, state}, payload) => {
            commit("applyState", payload);
        },

        reset: ({commit, state}, payload) => {
            Object.keys(stateTagApp["state"])
                .forEach((key, index) => {
                    commit("applyState", {locus: key, value: stateTagApp["state"][key]});
                });
        }
    },

    mutations: {
        applyState: function (state, payload) {
            _.set(state, payload.locus, payload.value)
        }
    }
});

stateTagApp["store"].watch(
    function (state) {
        return state.msg.en;
    },
    function (fresh, stale) {
        let log = 'English msg was changed!'
        stateTagApp.log(log);
    }
);

stateTagApp["store"].watch(
    function (state) {
        return state.msg.sp;
    },
    function (fresh, stale) {
        let log = 'Spanish msg was changed!'
        stateTagApp.log(log);
    }
);

export default stateTagApp["store"];