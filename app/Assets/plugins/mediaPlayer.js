class MediaPlayer {
    constructor(config, plugins) {
        this.initializer(config);
        this.plugins = plugins;
        this.initializePlugins();
        this.ControlsVisibility();
        this.ControlMediaTime();
    }
    initializer(config) {
        this.media = config.el;
        this.app = config.app;
        this.btPP = config.btPP;
        this.btMute = config.btMute;
        this.ctrsBar = config.ctrsBar;
        this.Tbar = config.Tbar;
        this.TbarWrapper = config.TbarWrapper;
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
        this.app.onmouseover = () => {
            this.ctrsBar.style.animation = "GrowIn 1s forwards";
            this.btPP[1].style.animation = "fadeIn 1s forwards";
        };
        this.app.onmouseout = () => {
            this.ctrsBar.style.animation = "GrowOut 1s forwards";
            this.btPP[1].style.animation = "fadeOut 1s forwards";
        };
    }
    ControlMediaTime() {
        const Width = this.TbarWrapper.clientWidth;
        const distanceTilLeft = this.TbarWrapper.getBoundingClientRect().left;
        const TotalTime = this.media.duration;
        const SetVideoTime = () => {
            const porcentTime = parseFloat(this.Tbar.style.width);
            this.media.currentTime = (porcentTime / 100) * TotalTime;
        };
        let isCLicked = false;
        this.TbarWrapper.addEventListener("click", (e) => {
            this.Tbar.style.width = GetPorcentWidth(Width, distanceTilLeft, e.clientX);
            SetVideoTime();
        });
        this.TbarWrapper.onmousedown = () => isCLicked = true;
        this.TbarWrapper.onmouseup = () => isCLicked = false;
        document.body.onmousemove = (e) => {
            if (!isCLicked)
                return;
            this.Tbar.style.width = GetPorcentWidth(Width, distanceTilLeft, e.clientX);
            SetVideoTime();
        };
        function GetPorcentWidth(Width, leftMargin, positionX) {
            let Wporcent = ((positionX - leftMargin) / Width) * 100;
            if (Wporcent > 100) {
                Wporcent = 100;
            }
            else if (Wporcent < 0) {
                Wporcent = 0;
            }
            return `${Wporcent}%`;
        }
        this.media.addEventListener("timeupdate", (e) => {
            const Time = Math.floor(this.media.currentTime);
            const Wporcent = (Time / TotalTime) * 100;
            const barWidth = `${Wporcent}%`;
            this.Tbar.style.width = barWidth;
        });
    }
}
export default MediaPlayer;
