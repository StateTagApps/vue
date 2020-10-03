stateTagApp["commands"] = {
    setEventContext:function (context){
        stateTagApp.execute('setEventContext', context);
    },

    clearEventContext:function (){
        stateTagApp.execute('setEventContext', null);
    },

    resetState:function (){
        stateTagApp.execute('reset');
    },
};

function recieveStateTagAppBroadcast(message) {
    let staMessage;
    try {
        staMessage = JSON.parse(message.data);
    } catch (e) {
        return;
    }
    if (_.isUndefined(staMessage.app) || staMessage.app != 'stateTagApp') {
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

    data['app'] = 'stateTagApp';

    if (!_.isNull(stateTagApp.$read('context'))) {
        data['context'] = stateTagApp.$read('context');
    }

    privateValidateStaEvent(data, desired, console.log);
    if (privateValidateStaEvent(data, required, function (msg) {
        alert(msg);
    })) {
        window.parent.postMessage(JSON.stringify(data), '*');
    }
}

function privateValidateStaEvent(data, spec, onFailCallback) {

    for (var r of spec) {
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

function privateBindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventHandler);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    privateBindEvent(window, "message", recieveStateTagAppBroadcast);
});