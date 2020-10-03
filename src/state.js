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
            let tmp = JSON.parse(JSON.stringify(stateTagApp["state"]));
            Object.keys(tmp)
                .forEach((locus, index) => {
                    if(locus == 'context'){
                        return;
                    }
                    commit("applyState", {locus, value: tmp[locus]});
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

stateTagApp["$read"] = stateTagApp.storage.getters.$read;
stateTagApp["$write"] = function (locus, value) {
    stateTagApp.storage.dispatch('write', {locus, value});
}
stateTagApp["$execute"] = stateTagApp.storage.dispatch;


export default stateTagApp["storage"];