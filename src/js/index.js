import App from './app.js';

let app = new App();
app.init();

function update() {
    requestAnimationFrame(update)
    app.update()
}
update()

console.log('')