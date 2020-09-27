const stateTagApp = {
    namespace: 'x',
    storage: [localStorage, sessionStorage][1],

    log: console.log,

    format: {
        date: 'Y-MM-DD',
    },

    //optional
    socket: {
        production: "https://services.x-html.app:3000",
        development: "https://services.x-html.app:3000"
    }
}
