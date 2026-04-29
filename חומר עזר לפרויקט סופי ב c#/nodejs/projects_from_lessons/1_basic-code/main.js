const { readFileSync, writeFileSync } = require("fs");

function welcomeName(inputFile, outputFile) {
 const name = readFileSync(inputFile);
 const message = `Hello, ${name}! Welcome to Node.js.`;
 
 writeFileSync(outputFile, message);
 
 console.log("Done!");
}

welcomeName("name.txt", "output.txt");
