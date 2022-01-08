import _ from "lodash";
import Vue from "vue";
import VueGun from "vue-gun";
import SEA from 'gun/sea';
stateTagApp['nebula'] = stateTagApp['nebula'][process.env.NODE_ENV];

Vue.use(VueGun, {
    peers: [stateTagApp['nebula'].concat(['/g', 'un'].join(''))]
});

export default {

};