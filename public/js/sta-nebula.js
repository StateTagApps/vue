function initGlobalNebulaWatchers() {
    var key = stateTagApp.$read('sta.appId')
        .concat('remoteCommand');

    stateTagApp.$onNebula(key, function (value){
        if(!_.isUndefined(stateTagApp.commands[value])){
            stateTagApp.commands[value]();
        }
    });
}