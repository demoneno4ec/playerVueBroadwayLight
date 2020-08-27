document.addEventListener("DOMContentLoaded", () => {
    let Player = new BroadwayPlayer(
        '#URL#',
        '/js/lib/Decoder.js'
    );
    Player.getFrame();
    Player.update();
});