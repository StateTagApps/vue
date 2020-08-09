function stateTagAppEventListener(m) {
    let message;
    try {
        message = JSON.parse(m.data)
    } catch (e) {
        return;
    }
    if (typeof message.app == 'undefined' || message.app != 'stateTagApp') {
        return;
    }
    console.log(message)

    /**
     * HANDLERS
     * You can respond to stateTagApp events here.
     */

}