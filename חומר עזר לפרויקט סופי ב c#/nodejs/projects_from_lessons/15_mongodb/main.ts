import App from "./app";

async function main() {
    let app: App = new App();
    process.on('exit', async () => {
        await app.terminate();
    });
    
    await app.init();
}

main();