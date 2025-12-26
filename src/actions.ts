import fs from "fs";
import { writeTasksToJSON, taskType, readTasksFromJSON } from "./utils.js";
import { time } from "console";

export function notEnoughArgsMsg() {
    console.log(
`Not enough arguments.
Usage: npm start <action> <argument>
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
    const timeStamp: string = now.toLocaleString(
        "UTC", 
        {
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
    const newTask: taskType = {
        id: tasks.length + 1,
        description: argv[3],
        status: "todo",
        createdAt: timeStamp,
        updatedAt: timeStamp,
    }
    tasks.push(newTask);

    try {
        writeTasksToJSON(tasks);
        console.log(`Task added successfully! (ID: ${newTask.id})`);
    } catch (err) {
        console.log("Error adding task: ", err);
    }
}

export function list(argv: string[]) {
    let tasks: taskType[] = readTasksFromJSON();
    if (argv.length > 3 && argv[3] === "v") {
        tasks.forEach((task) => {
            console.log(`${task.id}. ${task.status}\nCreated: ${task.createdAt}\nUpdated: ${task.updatedAt}\n${task.description}\n`);
        });
    } else {
        tasks.forEach((task) => {
            console.log(`${task.id}. ${task.description}`);
        });
    }
}

export function update(argv: string[]) {
    if (argv.length < 4) {
        console.error("Not enough arguments.\nUsage: npm start update <task ID> <desciption>");
        return;
    }

    const id: number = Number(argv[3]) - 1;
    if (!Number.isInteger(id)) {
        console.error("ID must be an integer.");
        return;
    }

    if (argv.length < 5) {
        console.error("Updated description missing.\nUsage: npm start update <task ID> <desciption>");
        return;
    }

    let tasks: taskType[] = readTasksFromJSON();
    if (id < 0 || id >= tasks.length) {
        console.error("Task update failed. ID missing.");
        return;
    }
    tasks[id].description = argv[4];
    writeTasksToJSON(tasks);
    console.log(`Task updated successfully. (ID: ${id})`);
}