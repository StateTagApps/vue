import Vue from "vue";
import VueRouter from 'vue-router';
import State from "./state";

const routes = [
    {
        name: "home",
        path: "/"
    },

    {
        name: 'pair',
        path: '/pair/:nebulaId',
        beforeEnter: function (to, from, next) {
            StateTagApp.$nebula('nebulaId', to.params.nebulaId);
            next({name: 'home'});
        }
    }
];

Vue.use(VueRouter);

export default new VueRouter({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});