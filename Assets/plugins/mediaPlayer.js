class MediaPlayer {
    constructor(config, plugins) {
        this.initializer(config);
        this.plugins = plugins;
        this.initializePlugins();
    }
    initializer(config) {
        this.media = config.el;
        this.app = config.app;
        this.btPP = config.btPP;
        this.btMute = config.btMute;
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
            this.btPP.style.backgroundPositionX = "-9.5vw";
            this.play();
        }
        else {
            this.btPP.style.backgroundPositionX = "0vw";
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
