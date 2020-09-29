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

function stateTagAppEventListener(message) {
    let staEvent;
    try {
        staEvent = JSON.parse(message.data);
    } catch (e) {
        return;
    }
    if (_.isUndefined(staEvent.app) || staEvent.app != 'stateTagApp') {
        return;
    }

    /**
     * HANDLERS
     * You can respond to stateTagApp events here.
     */
    stateTagApp.log(staEvent);

}

stateTagApp['dispatch'] = function (data) {
    let desired = ['app', 'type', 'from', 'event'];
    let required = [];

    data['app'] = 'stateTagApp';

    if (!_.isNull(stateTagApp.storage.getters.$read('context'))) {
        data['context'] = stateTagApp.storage.getters.$read('context');
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
            let msg = 'Missing staEvent element: '
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