stateTagApp['state'] = {
    sta: {}, //required & reserved

    msg: {
        en: "This text is inside state.js.",
        sp: "Este texto está dentro del estado.",
        fr: "Ce texte est à l'intérieur de l'état.",
    }
};

function initGlobalStateWatchers(state){
    state.watch(
        function (state) {
            return state.msg.en;
        },
        function (fresh, stale) {
            let log = 'Global watcher heard change from '
                .concat(stale)
                .concat(' to ')
                .concat(fresh);

            stateTagApp.log(log);
        }
    );

    state.watch(
        function (state) {
            return state.msg.fr;
        },
        function (fresh, stale) {
            let log = 'Global watcher heard change from '
                .concat(stale)
                .concat(' to ')
                .concat(fresh);

            stateTagApp.log(log);
        }
    );

    state.watch(
        function (state) {
            return state.msg.sp;
        },
        function (fresh, stale) {
            let log = 'Global watcher heard change from '
                .concat(stale)
                .concat(' to ')
                .concat(fresh);

            stateTagApp.log(log);
        }
    );
}