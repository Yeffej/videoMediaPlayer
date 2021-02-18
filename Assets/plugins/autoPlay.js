class AutoPlay {
    run(player) {
        const media = player.media
        this.play(media)

    }
    play(media) {
        media.muted = true
        media.play()
    }

}

export default AutoPlay;