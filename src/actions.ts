import fs from "fs";
import { writeTasksToJSON, taskType, readTasksFromJSON } from "./utils.js";
import { time } from "console";

export function notEnoughArgsMsg() {
    console.log(
`Not enough arguments.
Usage: npm start <action> <argument>.
Possible actions: list, add, update, delete.`
)
}

export function add(argv: string[]){
    if (argv.length < 4) {
        notEnoughArgsMsg();
        return;
    }

    let tasks: taskType[] = readTasksFromJSON();
    const now: Date = new Date();
    const newTask: taskType = {
        id: tasks.length + 1,
        description: argv[3],
        status: "todo",
        createdAt: now,
        updatedAt: now,
    }
    tasks.push(newTask);

    try {
        writeTasksToJSON(tasks);
        console.log(`Task added successfully! (ID: ${newTask.id})`);
    } catch (err) {
        console.log("Error adding task: ", err);
    }
}

export function list() {
    let tasks: taskType[] = readTasksFromJSON();
    tasks.forEach((task) => {
        console.log(`${task.id}. ${task.description}`);
    });
}