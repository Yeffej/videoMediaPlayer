import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from "./plugins/autoPause.js";
import MediaPlayer from "./plugins/mediaPlayer.js";
import RenderAds from "./plugins/adsController.js";
const video = document.querySelector("video");
const btPP = GetPlayPauseBT();
const btMute = document.querySelector("#muteBT");
const app = document.querySelector("#app");
const controlsBar = document.querySelector("#controlsWrapper");
const TBarWrapper = document.getElementById("TimeBarWrapper");
const TimeBar = document.getElementById("TBAR");
function GetPlayPauseBT() {
    const BT_1 = document.querySelector("#PlayPause");
    const BT_2 = document.querySelector("#playPauseM");
    const buttonsPP = [BT_1, BT_2];
    return buttonsPP;
}
const player = new MediaPlayer({
    el: video,
    app: app,
    btMute: btMute,
    btPP: btPP,
    ctrsBar: controlsBar,
    Tbar: TimeBar,
    TbarWrapper: TBarWrapper,
}, [new AutoPlay(), new AutoPause(), RenderAds.getInstance()]);
btPP.forEach((el) => {
    el.onclick = () => player.TogglePlay();
});
btMute.onclick = () => player.ToggleMute();
if (navigator.serviceWorker) {
    navigator.serviceWorker.register("../serviceW.js")
        .catch(e => {
        console.log("There´s an error in the process of register: " + e);
    });
}
else {
    console.log("The Service Worker is not supported");
}
