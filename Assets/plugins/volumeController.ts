import MediaPlayer from "mediaPlayer.js"

class Volume {
    run(player: MediaPlayer) {
        const VolCont:HTMLElement =  player.volBarContainer
        const VolBar:HTMLElement = VolCont.querySelector("#volBar")
        let Height
        let marginTop 
        let isCLicked = false

       VolCont.addEventListener("click", (e)=> {
            VolBar.style.height = this.GetPorcentHeight(Height, marginTop, e.clientY)
            this.SetVolume(parseFloat(VolBar.style.height), player)
       })
       VolCont.addEventListener("mousedown", ()=> {
           Height = VolCont.clientHeight
           marginTop = VolCont.getBoundingClientRect().top
            isCLicked = true
        })
        document.body.addEventListener("mouseup", ()=> {
            isCLicked = false
        })
        document.body.addEventListener("mousemove", (e)=> {
            if(!isCLicked) return;
            VolBar.style.height = this.GetPorcentHeight(Height, marginTop, e.clientY)
            this.SetVolume(parseFloat(VolBar.style.height), player)
        })


      
    }
    GetPorcentHeight(Height: number,  
    TopMargin: number, positionY: number) {
        const realHeight = Height- (positionY - TopMargin)
        let Porcent = (realHeight/Height) *100
        if(Porcent < 0) {
            Porcent = 0 
        }else if(Porcent > 100) {
            Porcent = 100 
        }

        return `${Porcent}%`
    }
    SetVolume(porcentH: number, player: MediaPlayer) {
        const volume = porcentH / 100
        player.media.volume = volume
    }
}

export default Volume;