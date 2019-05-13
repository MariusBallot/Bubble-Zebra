import ThreeScene from './threeScene';

class App {

    constructor() {
        this.threeScene = new ThreeScene()
    }

    init() {
        this.threeScene.init()
    }

    update() {
        this.threeScene.update()
    }

}

export { App as default }