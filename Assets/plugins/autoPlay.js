class AutoPlay {
    run(player) {
        const media = player.media;
        this.play(player);
    }
    play(player) {
        player.media.muted = true;
        player.media.play();
        player.btPP.style.backgroundPositionX = "-9.5vw";
    }
}
export default AutoPlay;
