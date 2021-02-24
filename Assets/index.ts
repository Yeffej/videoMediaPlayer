import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from "./plugins/autoPause.js";
import MediaPlayer from "./plugins/mediaPlayer.js"

const video: HTMLMediaElement = document.querySelector("video")
const btPP: HTMLElement = document.querySelector("#PlayPause")
const btMute: HTMLElement = document.querySelector("#muteBT")



const player = new MediaPlayer( {el: video}, [new AutoPlay(), new AutoPause()] )

btPP.onclick = () =>  player.TogglePlay()
btMute.onclick = () =>  player.ToggleMute()

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("../serviceW.js")
      .catch(e => {
        console.log("There´s an error in the process of register: " + e)
      })
}else {
  console.log("The Service Worker is not supported")
}