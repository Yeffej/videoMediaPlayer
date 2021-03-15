//TODO: autopause con intersection observer y visibilityChange
function AutoPause() {}

AutoPause.prototype.run = function(player) {
    document.addEventListener("visibilitychange", handleVisibility)
    const media: HTMLMediaElement = player.media
    const observer = new IntersectionObserver(handleCallBack, {
        threshold: 0.25
    })
    observer.observe(media)

    function handleCallBack(entries) {
        const EntryMedia = entries[0]
        if(EntryMedia.intersectionRatio < 0.25) {
            media.pause()
            player.btPP.style.backgroundPositionX = "0vw"

        }else {
            media.play()
            player.btPP.style.backgroundPositionX = "-9.5vw"
        }
    }

    function handleVisibility() {
        if(document.visibilityState === "hidden") {
            media.pause()
            player.btPP.style.backgroundPositionX = "0vw"

        }else if(document.visibilityState === "visible") {
            media.play()
            player.btPP.style.backgroundPositionX = "-9.5vw"

        }
    }
}


export default AutoPause;