import Vue from "vue";
import VueRouter from 'vue-router';

const routes = [
    {
        name: 'home',
        path: '/yada'
    }
];

Vue.use(VueRouter);

export default new VueRouter({
    //mode: 'abstract',
    base: process.env.BASE_URL,
    routes:routes
});