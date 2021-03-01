class MediaPlayer {
    constructor(config, plugins) {
        this.media = config.el;
        this.app = config.app;
        this.plugins = plugins;
        this.initializePlugins();
    }
    initializePlugins() {
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    TogglePlay() {
        if (this.media.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    }
    ToggleMute() {
        if (this.media.muted) {
            this.media.muted = false;
        }
        else {
            this.media.muted = true;
        }
    }
}
export default MediaPlayer;
