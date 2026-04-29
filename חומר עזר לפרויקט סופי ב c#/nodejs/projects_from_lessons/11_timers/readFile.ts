import { readFile } from 'node:fs';

console.log("Start");


readFile("file.txt", (err, txt) => {
    console.log("Reading file ended", txt);
    
    setTimeout(() => {
        console.log("Timer call");
    }, 2000);
});

console.log("End");