class FloatingCam {

    constructor(camera) {
        this.cam = camera
        this.mouseX = 0
        this.mouseY = 0
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;


        this.bind()
    }

    moveCam(event) {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.mouseX = (event.clientX - this.windowHalfX) / 1000;
        this.mouseY = (event.clientY - this.windowHalfY) / 1000;

    }

    update() {
        this.cam.position.x += (this.mouseX - this.cam.position.x) * .05;
        this.cam.position.y += (- this.mouseY - this.cam.position.y) * .05;
    }

    bind() {
        this.moveCam = this.moveCam.bind(this)
        this.update = this.update.bind(this)
    }


}

export { FloatingCam as default }