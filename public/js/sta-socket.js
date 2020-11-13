function initGlobalSocketWatchers() {
    stateTagApp.$onSocket('timecast', payload => {
        stateTagApp.$write('rolex', payload.stamp);
    });
}