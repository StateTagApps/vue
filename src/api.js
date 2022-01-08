import _ from "lodash";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { cacheAdapterEnhancer } from 'axios-extensions';
import "nprogress/nprogress.css";
import NProgress from "nprogress";

stateTagApp['api'] = stateTagApp['api'][process.env.NODE_ENV];

const requests = {};

NProgress.configure({
    parent: "body",
    showSpinner: false,
    trickleRate: 0.1,
    trickleSpeed: 400
});

let count = 0;
// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        let data = {
            type: "animation",
            from: "api",
            event: 'unknown',
            app: "stateTagApp"
        }

        if (!count) {
            NProgress.start();
            data.event = 'start';
            stateTagApp.$broadcast(data);

        } else if (count == 1) {
            NProgress.done(true);
            NProgress.configure({parent: "body"});
            NProgress.start();
        }
        count++;
        if (count != 1) {
            data.event = 'increment';
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        let data = {
            type: "animation",
            from: "api",
            event: 'unknown',
            app: "stateTagApp"
        }

        count--;
        data.event = 'decrement';

        if (!count) {
            data.event = 'stop';
            stateTagApp.$broadcast(data);
            NProgress.done(true);
        }
        return response;
    },
    function (error) {
        let data = {
            type: "animation",
            from: "api",
            event: 'unknown',
            app: "stateTagApp"
        }

        count--;
        data.event = 'decrement';

        if (!count) {
            NProgress.done(true);
            data.event = 'stop';
            stateTagApp.$broadcast(data);
        }
        return Promise.reject(error);
    }
);

axios.defaults.adapter = cacheAdapterEnhancer(axios.defaults.adapter)
Vue.use(VueAxios, axios);

export default {
    install(Vue, opts) {
        Vue.mixin({

            methods: {

                $api: function (endpoint, caller, post, method) {
                    let config = {};
                    let headers = {};

                    //CUSTOM HEADERS & AXIOS CONFIG
                    caller = caller.concat('-').concat(this._uid)
                    var cancelToken = this.privateAutoCancel(caller, this._uid);

                    config = {...config, headers, cancelToken}

                    method = (_.isUndefined(method))
                        ? (_.isUndefined(post))
                            ? 'get'
                            : 'post'
                        : method;

                    var promis = (_.isUndefined(post))
                        ? axios[method](endpoint, config)
                        : axios[method](endpoint, post, config);

                    promis.then(function (response) {
                        stateTagApp.broadcast({
                            type: 'api',
                            from: caller.split('-')[0],
                            event: response.status,
                            message: 'success'
                        });
                    }
                        .bind(caller))
                        .catch(function (error) {
                            try {
                                stateTagApp.broadcast({
                                    type: 'api',
                                    from: caller.split('-')[0],
                                    event: error.response.status,
                                    message: error.response.statusText
                                });
                            } catch (e) {
                                //probably cancelled
                            }
                        });

                    return promis;
                },

                privateAutoCancel: function (caller, uid) {
                    let key = caller + '-' + uid;

                    if (!_.isEmpty(requests[key])) {
                        requests[key].cancel();
                    }

                    let cancel = axios.CancelToken.source();
                    requests[key] = cancel;
                    return cancel.token;
                }
            }
        });
    }
};
