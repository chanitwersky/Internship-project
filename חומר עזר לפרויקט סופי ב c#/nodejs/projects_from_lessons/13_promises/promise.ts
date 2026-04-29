import fs from "node:fs";

const INPUT_FILE = "input.txt";

export function readFilePromise(inputFile: string) {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(inputFile, (err, data: Buffer) => {
            if (err) {
                reject(err);
            } else {
                const dataStr = data.toString();
                resolve(dataStr);
            }
        });
    });
}

// readFilePromise(INPUT_FILE)
//     .then((result: string) => {
//         console.log("File content:", result);
//     }).catch((err) => {
//         console.log("Failed reading file:", err.message);
//     }).finally(() => {
//         console.log("Promise ended");
//     });

// console.log("Pending");

