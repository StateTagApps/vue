stateTagApp['state'] = {
    context: null,

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
    storage: stateTagApp.disk
});

Vue.use(Vuex);

stateTagApp["storage"] = new Vuex.Store({
    plugins: [vuexPersist.plugin],

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

stateTagApp["storage"].watch(
    function (state) {
        return state.msg.en;
    },
    function (fresh, stale) {
        let log = 'Global watcher heard change from '
            .concat(stale)
            .concat(' to ')
            .concat(fresh);

        stateTagApp.log(log);
    }
);

stateTagApp["storage"].watch(
    function (state) {
        return state.msg.fr;
    },
    function (fresh, stale) {
        let log = 'Global watcher heard change from '
            .concat(stale)
            .concat(' to ')
            .concat(fresh);

        stateTagApp.log(log);
    }
);

stateTagApp["storage"].watch(
    function (state) {
        return state.msg.sp;
    },
    function (fresh, stale) {
        let log = 'Global watcher heard change from '
            .concat(stale)
            .concat(' to ')
            .concat(fresh);

        stateTagApp.log(log);
    }
);



export default stateTagApp["storage"];