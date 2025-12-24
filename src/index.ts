import { taskType, writeToJSON } from "./utils.js";
import { notEnoughArgsMsg, add, list } from "./actions.js"

function main() {
    const numOfArgs: number = process.argv.length;
    if (numOfArgs > 2) {
        if (process.argv[2] === "list") {
            list();
            process.exit(0);
        } else if (numOfArgs > 3 && process.argv[2] === "add") {
            add(process.argv[3]);
            process.exit(0);
        }
    }

    notEnoughArgsMsg();
    process.exit(0);
}

main();