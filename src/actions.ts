import { writeToJSON, taskType } from "./utils.js";

export function notEnoughArgsMsg() {
    console.log(
`Not enough arguments.
Usage: npm start <action> <argument> OR npm start list.
Possible actions: add, update, delete.`
)
}

export function add(task: string){
    writeToJSON(task);
}

export function list() {
    console.log("PLACEHOLDER");
}