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
            let counter = 0;
            player.btPP.forEach((el) => {
                if (counter === 1) {
                    el.style.backgroundPositionX = "3.5vw";
                }
                else {
                    el.style.backgroundPositionX = "0vw";
                }
                counter++;
            });
        }
        else {
            media.play();
            let counter = 0;
            player.btPP.forEach((el) => {
                if (counter === 1) {
                    el.style.backgroundPositionX = "-12vw";
                }
                else {
                    el.style.backgroundPositionX = "-9.5vw";
                }
                counter++;
            });
        }
    }
    function handleVisibility() {
        if (document.visibilityState === "hidden") {
            media.pause();
            let counter = 0;
            player.btPP.forEach((el) => {
                if (counter === 1) {
                    el.style.backgroundPositionX = "3.5vw";
                }
                else {
                    el.style.backgroundPositionX = "0vw";
                }
                counter++;
            });
        }
        else if (document.visibilityState === "visible") {
            media.play();
            let counter = 0;
            player.btPP.forEach((el) => {
                if (counter === 1) {
                    el.style.backgroundPositionX = "-12vw";
                }
                else {
                    el.style.backgroundPositionX = "-9.5vw";
                }
                counter++;
            });
        }
    }
};
export default AutoPause;
