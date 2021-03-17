class MediaPlayer {
    constructor(config, plugins) {
        this.initializer(config);
        this.plugins = plugins;
        this.initializePlugins();
        this.ControlsVisibility();
    }
    initializer(config) {
        this.media = config.el;
        this.app = config.app;
        this.btPP = config.btPP;
        this.btMute = config.btMute;
        this.ctrsBar = config.ctrsBar;
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
            let counter = 0;
            this.btPP.forEach((el) => {
                if (counter === 1) {
                    el.style.backgroundPositionX = "-12vw";
                }
                else {
                    el.style.backgroundPositionX = "-9.5vw";
                }
                counter++;
            });
            this.play();
        }
        else {
            let counter = 0;
            this.btPP.forEach((el) => {
                if (counter === 1) {
                    el.style.backgroundPositionX = "3.5vw";
                }
                else {
                    el.style.backgroundPositionX = "0vw";
                }
                counter++;
            });
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
    ControlsVisibility() {
        // this.app.onmouseover = () => {
        //   this.ctrsBar.style.animation = "GrowIn 1s forwards"
        //   this.btPP[1].style.animation = "fadeIn 1s forwards"
        // }
        // this.app.onmouseout = () => {
        //   this.ctrsBar.style.animation = "GrowOut 1s forwards"
        //   this.btPP[1].style.animation = "fadeOut 1s forwards"
        // }
    }
}
export default MediaPlayer;
