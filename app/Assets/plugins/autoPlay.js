class AutoPlay {
    run(player) {
        this.play(player);
    }
    play(player) {
        player.media.muted = true;
        player.media.play();
        let counter = 0;
        player.btPP.forEach((el) => {
            if (counter === 1) {
                el.style.backgroundPositionX = "-12vw";
            }
            else {
                el.style.backgroundPositionX = "-9.5vw";
            }
            counter++;
        });
    }
}
export default AutoPlay;
