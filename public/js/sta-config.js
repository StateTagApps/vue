const stateTagApp = {
    namespace: 'x',
    storage: [localStorage, sessionStorage][1],

    state: {
        msg: {
            en: "This text is inside state.",
            sp: "Este texto está dentro del estado.",
            fr: "Ce texte est à l'intérieur de l'état.",
        }
    },

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
