import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

let plugins = [];

if (stateTagApp.disk != 'blackhole') {
    const vuexPersist = new VuexPersist({
        key: stateTagApp['namespace'].concat("-#BUILD#"),
        storage: stateTagApp.disk
    });

    plugins.push(vuexPersist.plugin);
}

stateTagApp["storage"] = new Vuex.Store({
    plugins,

    state: {...stateTagApp["state"]},

    getters: {
        $read: (state, getters) => (locus) => {
            return _.get(state, locus);
        },
    },

    actions: {
        write: ({commit, state}, payload) => {
            commit("applyState", payload);
        },

        resetState: ({commit, state}, payload) => {
            let tmp = JSON.parse(JSON.stringify(stateTagApp["state"]));
            Object.keys(tmp)
                .forEach((locus, index) => {
                    if(locus == 'sta'){
                        return;
                    }
                    commit("applyState", {locus, value: tmp[locus]});
                });
        },

        resetApp: ({commit, state}, payload) => {
            let tmp = JSON.parse(JSON.stringify(stateTagApp["state"]));
            Object.keys(tmp)
                .forEach((locus, index) => {
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

stateTagApp["state"]["sta"]["context"] = null;
stateTagApp["$read"] = stateTagApp.storage.getters.$read;
stateTagApp["$write"] = function (locus, value) {
    stateTagApp.storage.dispatch('write', {locus, value});
}
stateTagApp["$execute"] = stateTagApp.storage.dispatch;

export default stateTagApp["storage"];