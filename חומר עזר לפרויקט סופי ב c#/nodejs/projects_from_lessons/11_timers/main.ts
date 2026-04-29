import App from "./app";

const SEC_TO_MS = 1000;

// const app = new App();
// app.init();

function sayHello(secs: number) {
    console.log(new Date(), "Starting");
    const timerId = setTimeout(() => {
        console.log(new Date(), "HELLO");
    }, secs * SEC_TO_MS);

    setTimeout(() => {
        console.log(new Date(), "Clearing");
        clearTimeout(timerId);
    }, (secs / 2) * SEC_TO_MS);

}

function sayHelloInterval(secs: number) {
    let count = 0;
    const timerId = setInterval(() => {
        console.log(`Count: ${count}`);
        count++;
        if (count > 5) clearInterval(timerId);
    }, 1000);

}

sayHelloInterval(2);