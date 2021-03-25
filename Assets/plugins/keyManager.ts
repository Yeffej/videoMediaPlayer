import MediaPlayer from "mediaPlayer.js";

class KeyAndFSManager {
    run(player: MediaPlayer) {
        const media:HTMLMediaElement  = player.media
        const FSButton:HTMLElement = player.ctrsBar.querySelector("#fullscrenBt")

        document.body.addEventListener("keydown", (e)=> {
            if (media.paused) return;

            if (e.keyCode === 39) { // arrowRight
                media.currentTime += 10

            }else if(e.keyCode === 37) { // arrowLeft
                media.currentTime -= 10
            }
        })

        this.toggleFullScreen(FSButton, player);
    }
    toggleFullScreen(button: HTMLElement, player: MediaPlayer) {
        const container = player.media.parentElement
        const imgCompress: any = button.lastElementChild
        const imgExpand: any = button.firstElementChild

        imgCompress.style.display = "none"
        const isFullScreen = () => {
            return document.fullscreenElement
        }


        button.addEventListener("click", ()=> {
            if(isFullScreen()) {
                document.exitFullscreen().catch((e)=> alert(e.message))
                imgCompress.style.display = "none"
                imgExpand.style.display = "initial"
            }else {
                container.requestFullscreen().catch((e)=> alert(e.message))
                imgExpand.style.display = "none"
                imgCompress.style.display = "initial"
            }
        })

    }

}

export default KeyAndFSManager;