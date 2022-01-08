stateTagApp.log(stateTagApp.namespace.concat("-html: #BUILD#"));

import _ from "lodash";
import Vue from "vue";
import vueCustomElement from "vue-custom-element";

stateTagApp.Vue = Vue;
stateTagApp.env = process.env.NODE_ENV;

Vue.use(vueCustomElement);
Vue.use(require("vue-moment"));

Vue.config.productionTip = {
    production: true,
    development: false
}[process.env.NODE_ENV];

Vue.prototype._ = _;
import {v4 as uuidv4} from 'uuid';

stateTagApp['uuid'] = uuidv4;

stateTagApp['api'] = stateTagApp['api'][process.env.NODE_ENV];
import Api from "./api";

Vue.use(Api);

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

if (!_.isUndefined(stateTagApp.socket)) {
    stateTagApp.socket = stateTagApp.socket[process.env.NODE_ENV];
    stateTagApp['socketIo'] = io(stateTagApp.socket);

    stateTagApp['$onSocket'] = function(event, handler){
        stateTagApp['socketIo'].on(event, handler);
    }

    Vue.use(VueSocketIOExt, stateTagApp['socketIo']);
}

Vue.filter("date", function (value, format) {
    format = format || stateTagApp.format.date;
    let date = new Date(value);
    return stateTagApp.Vue.moment(date).format(format)
});

import state from "./state";

let appId = stateTagApp.$read('sta.appId');
if(_.isUndefined(appId)){
    appId = uuidv4();
    stateTagApp.$write('sta.appId', appId);
}

initGlobalStateWatchers(stateTagApp["storage"]);
initGlobalSocketWatchers();

import XHtml from "./x-html";
Vue.use(XHtml);
import Manifest from "@/x-html/manifest";

for (let tag in Manifest) {
    Manifest[tag].store = state;
    Vue.customElement(tag, Manifest[tag]);
}