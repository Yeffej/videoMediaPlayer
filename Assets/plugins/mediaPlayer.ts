class MediaPlayer {
  media: HTMLMediaElement;
  private plugins: any;
  app: HTMLElement;
  btPP: HTMLElement[];
  btMute: HTMLElement;
  ctrsBar: HTMLElement;
  TbarWrapper: HTMLElement;
  Tbar: HTMLElement;
  loadedBar: HTMLElement
  displayDuration: HTMLElement;
  displayCurrentTime: HTMLElement;
  volBarContainer: HTMLElement;

  constructor(config, plugins) {
    this.initializer(config)
    this.plugins = plugins
    this.initializePlugins()
    this.ControlsVisibility()
    this.ControlMediaTime()
  }
  private initializer(config) {
    this.media = config.el
    this.app = config.app
    this.btPP = config.btPP
    this.btMute = config.btMute
    this.ctrsBar = config.ctrsBar
    this.Tbar = config.Tbar
    this.TbarWrapper = config.TbarWrapper
    this.displayDuration = config.displays[1]
    this.displayCurrentTime = config.displays[0]
    this.loadedBar = config.loadedBar
    this.volBarContainer = config.volBarContainer
  }
  private initializePlugins() {
    this.plugins.forEach(plugin => {
      plugin.run(this)
    });
  }
  play() {
    this.media.play()
  }
  pause() {
    this.media.pause()
  }
  TogglePlay() {
    if (this.media.paused) {
      let counter = 0
      this.btPP.forEach((el)=> {
        if(counter === 1) {
          el.style.backgroundPositionX = "-12vw"
        }else {
          el.style.backgroundPositionX = "-9.5vw"
        }

        counter++;
      })
      
      this.play()
    }else {
      let counter = 0
      this.btPP.forEach((el)=> {
        if(counter === 1) {
          el.style.backgroundPositionX = "3.5vw"
        }else {
          el.style.backgroundPositionX = "0vw"
        }

        counter++;
      })
      this.pause()
    }
  }
  ToggleMute() {
    if (this.media.muted) {
        this.media.muted = false
    }else {
        this.media.muted = true
    }
  }
  private ControlsVisibility() {
    // this.app.onmouseover = () => {
    //   this.ctrsBar.style.animation = "GrowIn 1s forwards"
    //   this.btPP[1].style.animation = "fadeIn 1s forwards"

    // }
    // this.app.onmouseout = () => {
    //   this.ctrsBar.style.animation = "GrowOut 1s forwards"
    //   this.btPP[1].style.animation = "fadeOut 1s forwards"
    // }
    
  }
  private ControlMediaTime() {
    const Width: number = this.TbarWrapper.clientWidth
    const distanceTilLeft: number = this.TbarWrapper.getBoundingClientRect().left
    const TotalTime: number = this.media.duration
    let isCLicked:boolean = false
    const SetVideoTime = () => {
        const porcentTime = parseFloat(this.Tbar.style.width)
        this.media.currentTime = (porcentTime / 100) * TotalTime
    } 
    function FormatTime(time:number) {
        const hours = Math.floor( time / 3600 )
        const minutes = Math.floor( (time % 3600)/60 )
        const seconds = Math.floor(time % 60)
      
        const formatHours = hours > 9? hours: `0${hours}`
        const formatMinutes = minutes > 9? minutes: `0${minutes}`
        const formatSeconds = seconds > 9? seconds: `0${seconds}`

        if (hours > 0) {
          return `${formatHours}: ${formatMinutes}: ${formatSeconds}`
        }

        return `${formatMinutes} : ${formatSeconds}`
    }

    this.media.addEventListener("progress", () => {
        const bufferLength = this.media.buffered.length
        const WidthEnd = this.media.buffered.end(bufferLength -1)
        const PorcentTime = ((WidthEnd) / TotalTime) * 100
        this.loadedBar.style.width = `${PorcentTime}%`
    })

    this.media.addEventListener("loadeddata", () =>  {
      this.displayDuration.textContent = FormatTime(TotalTime)
    })
    // this.displayDuration.textContent = FormatTime(TotalTime)

    this.TbarWrapper.addEventListener("click", (e)=> {
      this.Tbar.style.width = GetPorcentWidth(Width, distanceTilLeft, e.clientX)
      SetVideoTime()
      this.displayCurrentTime.textContent = FormatTime(this.media.currentTime)

    })

    this.TbarWrapper.onmousedown = () => isCLicked = true;
    document.body.onmouseup = () => isCLicked = false;
    document.body.onmousemove = (e) => {
        if(!isCLicked) return;
        this.Tbar.style.width = GetPorcentWidth(Width, distanceTilLeft, e.clientX)
        SetVideoTime()
        this.displayCurrentTime.textContent = FormatTime(this.media.currentTime)

    };

    function GetPorcentWidth (Width: number,  leftMargin: number, positionX: number)
    {
        let Wporcent = ((positionX - leftMargin) / Width) * 100
        if(Wporcent > 100) {
          Wporcent = 100     
        }else if (Wporcent < 0) {
          Wporcent = 0
        }

        return `${Wporcent}%`;
    }

    this.media.addEventListener("timeupdate", (e) => {
      // const Time =   Math.floor(this.media.currentTime)
      const Time = this.media.currentTime
      const Wporcent = (Time / TotalTime) * 100
      const barWidth = `${Wporcent}%`

      this.Tbar.style.width = barWidth
      this.displayCurrentTime.textContent = FormatTime(this.media.currentTime)
    })

    this.media.load();

  }


}



export default MediaPlayer