import {mapGetters} from "vuex";

const XHtml = {
    install(Vue, opts) {
        Vue.mixin({
            computed: {
                ...mapGetters(['$read']),

                $onSocket: function () {
                    return this.$socket.$subscribe;
                },
            },

            methods: {
                log: stateTagApp.log,
                isUrl: function (url) {
                    if (typeof url != "string") return false;
                    return (url.substr(0, 4) == "http"
                        || url.substr(0, 2) == "//");
                },
                $write: stateTagApp.$write,
                $execute: stateTagApp.$execute,
                $broadcast: stateTagApp.$broadcast,

                nestedTagSpecs(tagSpecs, k) {
                    let nesting = tagSpecs.split('|');
                    if (nesting.length >= k + 1) {
                        //this goofiness mechanizes deeper nesting
                        // tag-specs="div,div.amazing,div|h1,h2,div.description&div.nested-deeper,div|div,div"

                        var str = nesting[k];
                        while (str.indexOf('&') !== -1) {
                            str = str.replace('&', '|');
                        }
                        while (str.indexOf('||') !== -1) {
                            str = str.replace('||', '&');
                        }

                        return str;
                    }
                    return false;
                },

                tagSpec: function (tagSpecs, k) {
                    return tagSpecs.split('|')[0].split(',')[k]
                },

                tagName: function (spec) {
                    return spec.split('.')[0]
                },

                tagClasses: function (spec, additional_classes) {
                    additional_classes = (typeof additional_classes == 'undefined') ? '' : ' '.concat(additional_classes);
                    return spec.split('.').splice(1).join([' ']).concat(additional_classes);
                }
            }
        });
    }
};

export default XHtml;
