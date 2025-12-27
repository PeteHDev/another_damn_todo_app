import { notEnoughArgsMsg, add, list, update, mark, del } from "./actions.js"

function main() {
    const numOfArgs: number = process.argv.length;
    if (numOfArgs > 2) {
        if (process.argv[2] === "list") {
            list(process.argv);
            process.exit(0);
        } 
        
        if (process.argv[2] === "add") {
            add(process.argv);
            process.exit(0);
        }

        if (process.argv[2] === "update") {
            update(process.argv);
            process.exit(0);
        }

        if (process.argv[2] === "mark") {
            mark(process.argv);
            process.exit(0);
        }

        if (process.argv[2] === "delete") {
            del(process.argv);
            process.exit(0);
        }
    }

    notEnoughArgsMsg();
    process.exit(1);
}

main();