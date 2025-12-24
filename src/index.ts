import { taskType, writeToJSON } from "./utils.js";

function main() {
    const numOfArgs: number = process.argv.length;
    if (numOfArgs > 2) {
        writeToJSON(process.argv[2]);
    } else {
        console.log(
`Not enough arguments.
Usage: npm start <action>.
Possible actions: list, add, update, delete.`
)
    }
}

main();