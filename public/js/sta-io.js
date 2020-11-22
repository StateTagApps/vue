stateTagApp["commands"] = {
    setEventContext:function (context){
        stateTagApp.$write('sta.context', context);
        return stateTagApp.$read('sta.context');
    },

    getEventContext:function (){
        return stateTagApp.$read('sta.context');
    },

    clear:function(){
        stateTagApp.$execute('resetState')
    },

    reset:function(){
        stateTagApp.$execute('resetApp')
    }
};

function receiveStateTagAppBroadcast(message) {
    let staMessage;
    try {
        staMessage = JSON.parse(message.data);
    } catch (e) {
        return;
    }
    if (_.isUndefined(staMessage.app) || staMessage.app != 'stateTagApp'.concat(':').concat(stateTagApp.namespace)) {
        return;
    }

    /**
     * HANDLERS
     * You can respond to stateTagApp events here.
     */
    stateTagApp.log(staMessage);

}

stateTagApp["$broadcast"] = function (data) {
    let desired = ['app', 'type', 'from', 'event'];
    let required = [];

    data['app'] = 'stateTagApp'.concat(':').concat(stateTagApp.namespace);

    if (!_.isNull(stateTagApp.$read('sta.context'))) {
        data['context'] = stateTagApp.$read('sta.context');
    }

    staValidateStaEvent(data, desired, console.log);
    if (staValidateStaEvent(data, required, function (msg) {
        alert(msg);
    })) {
        window.parent.postMessage(JSON.stringify(data), '*');
    }
}

function staValidateStaEvent(data, spec, onFailCallback) {

    for (let r of spec) {
        if (_.isEmpty(data[r]) && !_.isNumber(data[r])) {
            let msg = 'Missing staMessage element: '
                .concat(r)
                .concat(' in ')
                .concat(JSON.stringify(data));

            if (_.isFunction(onFailCallback)) {
                onFailCallback(msg);
            }

            return false;
        }
    }

    return true;
}

function staBindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventHandler);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    staBindEvent(window, "message", receiveStateTagAppBroadcast);
});