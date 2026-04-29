import { promises } from "fs";
const FILES = ["file.txt", "file2.txt"];
let counter = 0;

async function readFileAsync(filePath: string): Promise<void> {
    try {
        const content = await promises.readFile(filePath, 'utf8');
        console.log("File content:", content);
    } catch (err) {
        console.log("Failed reading file", err.message)
    } finally {
        counter++;
    }
}

async function waitForCounter() {
    while (counter < 2) {
        const promise = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
        await promise;
    }
    return 1;
}

async function readFiles() {
    for (const file of FILES) {
        readFileAsync(file);
    }
    await waitForCounter();
    console.log("Done");
}

readFiles();