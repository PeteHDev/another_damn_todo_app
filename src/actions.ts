import fs from "fs";
import { writeTasksToJSON, taskType, readTasksFromJSON } from "./utils.js";

export function notEnoughArgsMsg() {
    console.log(
`Not enough arguments.
Usage: npm start <action> <argument> OR npm start list.
Possible actions: add, update, delete.`
)
}

export function add(task: string){
    let tasks: taskType[] = readTasksFromJSON();
    const newTask: taskType = {
        id: tasks.length + 1,
        description: task,
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