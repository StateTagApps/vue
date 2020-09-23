const stateTagApp = {
    storage: [localStorage, sessionStorage][1],

    dispatch: function (data) {
        data['app'] = 'stateTagApp';
        if (!_.isNull(this.state.state.context)) {
            data['thread'] = this.state.state.context;
        }

        let desired = ['app', 'type', 'from', 'event'];
        let required = [];

        privateValidateStaEvent(data, desired, console.log);
        if(privateValidateStaEvent(data, required, alert)){
            window.parent.postMessage(JSON.stringify(data), '*');
        }
    },

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
    }
}

function privateValidateStaEvent(data, spec, onFailCallback){

    for (var r of spec) {
        if (_.isEmpty(data[r]) && !_.isNumber(data[r])) {
            let msg = 'Missing staEvent element: '
                .concat(r)
                .concat(' in ')
                .concat(JSON.stringify(data));

            onFailCallback(msg)
            return false;
        }
    }

    return true;
}
