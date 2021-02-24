//TODO: autopause con intersection observer y visibilityChange
function AutoPause() { }
AutoPause.prototype.run = function (player) {
    document.addEventListener("visibilitychange", handleVisibility);
    const media = player.media;
    const observer = new IntersectionObserver(handleCallBack, {
        threshold: 0.25
    });
    observer.observe(media);
    function handleCallBack(entries) {
        const EntryMedia = entries[0];
        if (EntryMedia.intersectionRatio < 0.25) {
            media.pause();
        }
        else {
            media.play();
        }
    }
    function handleVisibility() {
        if (document.visibilityState === "hidden") {
            media.pause();
        }
        else if (document.visibilityState === "visible") {
            media.play();
        }
    }
};
export default AutoPause;
