const stateTagApp = {
    storage: [localStorage, sessionStorage][1],

    format: {
        date: 'Y-MM-DD',
    },

    api: {
        production: "https://data.StateTagApp.com",
        development: "https://data.StateTagApp.com"
    },

    socket: {
        production: "https://services.x-html.app:3000",
        development: "https://services.x-html.app:3000"
    },

    dispatch: function (data) {
        let desired = ['app', 'type', 'from', 'event'];
        let required = [];

        data['app'] = 'stateTagApp';

        if (!_.isNull(this.state.state.context)) {
            data['thread'] = this.state.state.context;
        }

        privateValidateStaEvent(data, desired, console.log);
        if (privateValidateStaEvent(data, required, function (msg) {
            alert(msg);
        })) {
            window.parent.postMessage(JSON.stringify(data), '*');
        }
    },
}

function privateValidateStaEvent(data, spec, onFailCallback) {

    for (var r of spec) {
        if (_.isEmpty(data[r]) && !_.isNumber(data[r])) {
            let msg = 'Missing staEvent element: '
                .concat(r)
                .concat(' in ')
                .concat(JSON.stringify(data));

            if (_.isFunction(onFailCallback)) {
                onFailCallback(msg)
            }

            return false;
        }
    }

    return true;
}
