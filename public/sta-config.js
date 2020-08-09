const stateTagApp = {
    broadcast: function (data) {
        data['app'] = 'stateTagApp';

        let desired = ['app', 'type', 'from', 'event'];
        for (var r of desired) {
            if (_.isEmpty(data[r]) && !_.isNumber(data[r])) {
                console.log('Missing desirable broadcast element: '.concat(JSON.stringify(data)))
            }
        }

        window.parent.postMessage(JSON.stringify(data), '*');
    },

    format: {
        date: 'Y-MM-DD',
    },

    servers: {
        production: "https://data.StateTagApp.com",
        development: "https://data.StateTagApp.com"
    }
}