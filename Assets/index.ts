import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from "./plugins/autoPause.js";
import MediaPlayer from "./plugins/mediaPlayer.js"
import RenderAds from "./plugins/adsController.js"

const video: HTMLMediaElement = document.querySelector("video")
const btPP: HTMLElement[] = GetPlayPauseBT()
const btMute: HTMLElement = document.querySelector("#muteBT")
const app: HTMLElement = document.querySelector("#app")
const controlsBar: HTMLElement = document.querySelector("#controlsWrapper")

function GetPlayPauseBT() {
  const BT_1: HTMLElement =  document.querySelector("#PlayPause")
  const BT_2: HTMLElement =  document.querySelector("#playPauseM")
  const buttonsPP = [BT_1, BT_2]

  return buttonsPP;
}

const player = new MediaPlayer( {
  el: video, 
  app: app, 
  btMute: btMute,
  btPP: btPP,
  ctrsBar: controlsBar
},
   [new AutoPlay(), new AutoPause(), RenderAds.getInstance()] )

btPP.forEach((el) => {
  el.onclick = ()=> player.TogglePlay();
})
btMute.onclick = () =>  player.ToggleMute()

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("../serviceW.js")
      .catch(e => {
        console.log("There´s an error in the process of register: " + e)
      })
}else {
  console.log("The Service Worker is not supported")
}