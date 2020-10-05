const stateTagApp = {
    namespace: 'x',
    disk: [localStorage, sessionStorage][1],
    log: console.log,

    format: {
        date: 'Y-MM-DD',
    },

    api: {
        production: "https://data.StateTagApps.com",
        development: "https://data.StateTagApps.com"
    },

    //optional
    socket: {
        production: "https://timesocket.io:3030",
        development: "https://timesocket.io:3030"
    }
}
