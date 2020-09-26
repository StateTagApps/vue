console.log("Reservation-stateTagApp: #stateTagAppVersion#");

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

import Api from "./api";

Vue.use(Api);

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

if (!_.isUndefined(stateTagApp.socket)) {
    stateTagApp.socket = stateTagApp.socket[process.env.NODE_ENV];
    const socket = io(stateTagApp.socket);
    Vue.use(VueSocketIOExt, socket);
}

import state from "./state";
stateTagApp["state"] = state;

function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventHandler);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    bindEvent(window, "message", stateTagAppEventListener);
});

Vue.filter('fromCamelToWords', function (str) {
    return str
        .replace(/[0-9]{2,}/g, match => ` ${match} `)
        .replace(/[^A-Z0-9][A-Z]/g, match => `${match[0]} ${match[1]}`)
        .replace(/[A-Z][A-Z][^A-Z0-9]/g, match => `${match[0]} ${match[1]}${match[2]}`)
        .replace(/[ ]{2,}/g, match => ' ')
        .replace(/\s./g, match => match.toUpperCase())
        .replace(/^./, match => match.toUpperCase())
        .trim();
});

Vue.filter("date", function (value, format) {
    format = format || stateTagApp.format.date;
    let date = new Date(value);
    return stateTagApp.Vue.moment(date).format(format)
});

import XHtml from "./html";

Vue.use(XHtml);

import Manifest from "@/x-html/manifest";

for (let tag in Manifest) {
    Manifest[tag].store = state;
    Vue.customElement(tag, Manifest[tag]);
}