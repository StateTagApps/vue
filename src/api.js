import _ from "lodash";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import buildUrl from "build-url";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

stateTagApp.api = stateTagApp.apis[process.env.NODE_ENV]
let API_URL = stateTagApp.api.concat("/tag-app")
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
            window.parent.postMessage(JSON.stringify(data), '*');

        } else if (count == 1) {
            NProgress.done(true);
            NProgress.configure({parent: "body"});
            NProgress.start();
        }
        count++;
        if (count != 1) {
            data.event = 'increment';
            //window.parent.postMessage(JSON.stringify(data), '*');
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
        //window.parent.postMessage(JSON.stringify(data), '*');

        if (!count) {
            data.event = 'stop';
            window.parent.postMessage(JSON.stringify(data), '*');
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
        //window.parent.postMessage(JSON.stringify(data), '*');
        if (!count) {
            NProgress.done(true);
            data.event = 'stop';
            window.parent.postMessage(JSON.stringify(data), '*');
        }
        return Promise.reject(error);
    }
);

Vue.use(VueAxios, axios);

export default {
    install(Vue, opts) {
        Vue.mixin({

            methods: {


                privateAutoCancel: function (caller, uid) {
                    let key = caller + '-' + uid;

                    if (!_.isEmpty(requests[key])) {
                        requests[key].cancel();
                    }

                    let cancel = axios.CancelToken.source();
                    requests[key] = cancel;
                    return cancel.token;
                },

                api: function (endpoint, caller, post) {
                    let config = {};
                    let headers = {};

                    //CUSTOM HEADERS & AXIOS CONFIG

                    caller = caller.concat('-').concat(this._uid)
                    var cancelToken = this.privateAutoCancel(caller, this._uid);

                    config = {...config, headers, cancelToken}

                    if (_.isUndefined(post)) {
                        var promis = axios.get(endpoint, config)
                    } else {
                        var promis = axios.post(endpoint, post, config);
                    }

                    promis.then(function (response) {
                        stateTagApp.broadcast({
                            type: 'api',
                            from: caller.split('-')[0],
                            event: response.status,
                            data: response.data
                        });
                    }
                        .bind(caller))
                        .catch(function (error) {

                            try {
                                stateTagApp.broadcast({
                                    type: 'api',
                                    from: caller.split('-')[0],
                                    event: error.response.status,
                                    error: error.response.data.message
                                });
                            } catch (e) {
                                //probably cancelled
                            }
                        });

                    return promis;
                }
            }
        });
    }
};
