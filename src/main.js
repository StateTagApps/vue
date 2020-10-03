stateTagApp.log("Reservation-stateTagApp: #stateTagAppVersion#");

import _ from "lodash";
import buildUrl from "build-url";
import Vue from "vue";
import vueCustomElement from "vue-custom-element";


Vue.use(vueCustomElement);
Vue.use(require("vue-moment"));

Vue.config.productionTip = {
    production: true,
    development: false
}[process.env.NODE_ENV];

_.mixin({
    isUrl: function (url) {
        if (typeof url != "string") return false;
        return (url.substr(0, 4) == "http"
            || url.substr(0, 2) == "//");
    },
    buildUrl: buildUrl
});

Vue.prototype._ = _;

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

import XHtml from "./x-html";
Vue.use(XHtml);
import Manifest from "@/x-html/manifest";

import state from "./state";

for (let tag in Manifest) {
    Manifest[tag].store = state;
    Vue.customElement(tag, Manifest[tag]);
}