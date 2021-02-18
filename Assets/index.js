import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from "./plugins/autoPause.js";

const video = document.querySelector("video")
const btPP = document.querySelector("#PlayPause")
const btMute = document.querySelector("#muteBT")


function MediaPlayer(config, plugins) {
    this.media = config.el
    this.plugins = plugins
    this.initializePlugins()
}

MediaPlayer.prototype.initializePlugins = function() {
    const player = {
        media:  this.media,
        play: () => this.media.play,
        pause: () => this.media.pause,
    }
    
    this.plugins.forEach(plugin => {
        plugin.run(player)
    });
}
MediaPlayer.prototype.play = function() {
  this.media.play()
}
MediaPlayer.prototype.pause = function() {
  this.media.pause()
}
MediaPlayer.prototype.TogglePlay = function() {
  if (this.media.paused) {
    this.play()
  }else {
    this.pause()
  }
}
MediaPlayer.prototype.ToggleMute = function() {
    if (this.media.muted) {
        this.media.muted = false
    }else {
        this.media.muted = true
    }
}

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