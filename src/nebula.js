import Vue from "vue";
import VueGun from "vue-gun";

stateTagApp['nebula'] = stateTagApp['nebula'][process.env.NODE_ENV];

Vue.use(VueGun, {
    peers: [stateTagApp['nebula'].concat(['/g', 'un'].join(''))]
});

stateTagApp['$nebula'] = function(key, val){
    Vue.prototype.$gun
        .get(stateTagApp.namespace)
        .get(stateTagApp.$read('sta.nebulaId'))
        .put({[key]: val}, function (ack) {
            //console.log(ack);
        });
}

stateTagApp['$onNebula'] = function(key, callback){
    Vue.prototype.$gun
        .get(stateTagApp.namespace)
        .get(stateTagApp.$read('sta.nebulaId'))
        .get(key)
        .on(callback, {change: true});
}



export default {
    install(Vue, opts) {
        Vue.mixin({
            methods: {
                //https://gun.eco/docs/API#-core-api-
                $nebula: stateTagApp['$nebula'],
                $onNebula: stateTagApp['$onNebula'],
            }
        })
    }
};
