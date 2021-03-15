import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from "./plugins/autoPause.js";
import MediaPlayer from "./plugins/mediaPlayer.js";
import RenderAds from "./plugins/adsController.js";
const video = document.querySelector("video");
const btPP = document.querySelector("#PlayPause");
const btMute = document.querySelector("#muteBT");
const app = document.querySelector("#app");
const player = new MediaPlayer({
    el: video,
    app: app,
    btMute: btMute,
    btPP: btPP
}, [new AutoPlay(), new AutoPause(), RenderAds.getInstance()]);
btPP.onclick = () => player.TogglePlay();
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
