class App {

    constructor() {
        this.aVariable = 'hello world'
    }

    hello() {
        console.log(this.aVariable)
    }

}

export { App as default }