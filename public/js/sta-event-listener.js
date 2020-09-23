function stateTagAppEventListener(m) {
    let staEvent;
    try {
        staEvent = JSON.parse(m.data)
    } catch (e) {
        return;
    }
    if (typeof staEvent.app == 'undefined' || staEvent.app != 'stateTagApp') {
        return;
    }
    console.log(staEvent)

    /**
     * HANDLERS
     * You can respond to stateTagApp events here.
     */

}