import { promises } from "node:fs";

async function whatWillHappen() {
    await promises.writeFile("output.txt", "HELLO");
    while(true);
}

whatWillHappen();