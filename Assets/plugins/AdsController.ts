import  ALL_ADS, {Ad} from "./Ads.js"
import mediaPlayer from "./mediaPlayer.js"
class AdsController {
    private ads: Ad[]
    
    private constructor() {
        this.initializeAds()
    }
    private initializeAds() {
        this.ads = ALL_ADS
    }
    public static GetInstance() {
        let Instance: AdsController  = null
        if (Instance === null) {
            Instance = new AdsController();
        }

        return Instance;
    }
    public getAD() {
        if (this.ads.length <= 0) {
            this.initializeAds()
        }

        return this.ads.pop();
    }

}

class Renderads {
    private controller: AdsController
    

    private constructor(controller: AdsController) {
        this.controller = controller
    }
    public static getInstance() {
        let Instance: Renderads  = null
        if (Instance === null) {
            Instance = new Renderads(AdsController.GetInstance())
        }
        return Instance;
    }
    run(player: mediaPlayer) {
        this.renderAds(player.app, player)
    }
    adMaker() {
        const ad = this.controller.getAD()
        const adContainer = document.createElement("div")
        adContainer.className = "ADSwrapper"
        const adImg = document.createElement("img")
        adImg.src = ad.imageURL;
        const adtext = document.createElement("p")
        adtext.textContent = ad.body
        const adtitle = document.createElement("h3")
        adtitle.textContent = ad.title
        const adlink = document.createElement("a")
        adlink.textContent = "Ir Al Curso"
        adlink.href = ad.url
        adContainer.append (adtitle, adtext, adImg, adlink)

        return adContainer;
    }

    renderAds(app: HTMLElement, player: mediaPlayer) {
        const media: HTMLMediaElement = player.media
        let counter = 0;
        function handlerMedia() {
            if (counter > 0) return;
            const time = Math.floor(media.currentTime)
            if ( time > 1  && time % 40 === 0) {
                console.log("ok")
                const ad = this.adMaker()
                app.appendChild(ad)
                console.log(ad)
                counter++

                setTimeout(() => {
                    ad.remove()
                    counter = 0
                }, 10000) 
            }
        }
        
        const handlerMediaEvent = handlerMedia.bind(this)
        media.addEventListener("timeupdate", handlerMediaEvent)

    }
}

export default Renderads
