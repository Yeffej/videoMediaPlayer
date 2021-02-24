function MediaPlayer(config, plugins) {
    this.media = config.el;
    this.plugins = plugins;
    this.initializePlugins();
}
MediaPlayer.prototype.initializePlugins = function () {
    const player = {
        media: this.media
    };
    this.plugins.forEach(plugin => {
        plugin.run(player);
    });
};
MediaPlayer.prototype.play = function () {
    this.media.play();
};
MediaPlayer.prototype.pause = function () {
    this.media.pause();
};
MediaPlayer.prototype.TogglePlay = function () {
    if (this.media.paused) {
        this.play();
    }
    else {
        this.pause();
    }
};
MediaPlayer.prototype.ToggleMute = function () {
    if (this.media.muted) {
        this.media.muted = false;
    }
    else {
        this.media.muted = true;
    }
};
export default MediaPlayer;
