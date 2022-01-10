function initGlobalNebulaWatchers(uuidv4, _) {
    let nebulaId = stateTagApp.$read('sta.nebulaId');
    if(_.isUndefined(nebulaId)){
        nebulaId = uuidv4();
        stateTagApp.$write('sta.nebulaId', nebulaId);
    }

    stateTagApp.$onNebula('remoteCommand', function (value){
        if(!_.isUndefined(stateTagApp.commands[value])){
            stateTagApp.commands[value]();
            stateTagApp.$nebula(key, null);
            stateTagApp.log(value.concat(' executed and deleted.'))
        }
    });
}