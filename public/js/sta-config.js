const stateTagApp = {
    namespace: 'x',
    disk: [localStorage, sessionStorage][1],

    log: console.log,

    //optional
    socket: {
        production: "https://services.x-html.app:3000",
        development: "https://services.x-html.app:3000"
    }
}
