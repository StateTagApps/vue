import _ from "lodash";
import Vue from "vue";
import VueGun from "vue-gun";
import SEA from 'gun/sea';

stateTagApp['nebula'] = stateTagApp['nebula'][process.env.NODE_ENV];

Vue.use(VueGun, {
    file: 'nebula',
    peers: [stateTagApp['nebula'].concat(['/g', 'un'].join(''))]
});

stateTagApp['$onNebula'] = function(key, callback){
    Vue.prototype.$gun
        .get(stateTagApp.namespace)
        .get(key)
        .on(callback, {change: true});
}

stateTagApp['$nebula'] = function(key, val){
    Vue.prototype.$gun
        .get(stateTagApp.namespace)
        .put({[key]: val}, function (ack) {
            //console.log(ack);
        });
}

export default {
    install(Vue, opts) {
        Vue.mixin({
            methods: {
                //https://gun.eco/docs/API#-core-api-
                $nebula: function (key, val) {
                    this.$gun.get(stateTagApp.namespace)
                        .put({[key]: val}, function (ack) {
                            //console.log(ack);
                        });
                },
                $onNebula: function (key, callback){
                    this.$gun.get(stateTagApp.namespace)
                        .get(key)
                        .on(callback, {change: true});
                }
            }
        })
    }
};