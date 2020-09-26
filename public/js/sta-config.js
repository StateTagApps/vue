const stateTagApp = {
    namespace: 'x',
    storage: [localStorage, sessionStorage][1],
    log: console.log,

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
