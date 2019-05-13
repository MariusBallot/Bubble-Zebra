let playing = false;

class AudioReactor {

    constructor() {
        this.ctx
        this.audio
        this.audioSource
        this.analyser

        this.fdata

        this.bind()
        document.querySelector(".start").addEventListener('click', this.play)
    }

    play() {
        if (!playing) {
            this.ctx = new AudioContext();
            this.audio = document.querySelector('#audio');
            this.audioSource = this.ctx.createMediaElementSource(this.audio);
            this.analyser = this.ctx.createAnalyser();
            this.analyser.smoothingTimeConstant = 0.8

            this.audioSource.connect(this.analyser);
            this.audioSource.connect(this.ctx.destination);
            this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
            playing = true
            document.querySelector("header").classList.add("off")

            setTimeout(function () {
                this.audio.play()
            }, 1000)
        }
    }

    update() {
        this.analyser.getByteFrequencyData(this.fdata);

    }

    bind() {
        this.play = this.play.bind(this)
        this.update = this.update.bind(this)
    }

}

export { AudioReactor as default }