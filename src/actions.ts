import { writeTasksToJSON, taskType, readTasksFromJSON } from "./utils.js";

export function notEnoughArgsMsg() {
    console.log(
`Not enough arguments.
Usage: npm start <action> <argument>
Possible actions: list, add, mark, update, delete.`
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
    if (argv.length < 3) {
        notEnoughArgsMsg();
        return;
    }

    const listArgs: string[] = argv.slice(3);
    const tasks: taskType[] = readTasksFromJSON();
    const verbose: boolean = listArgs.includes("v");
    let status: string = "any";
    if (listArgs.includes("todo")) {
        status = "todo";
    } else if ((listArgs.includes("in-progress"))) {
        status = "in-progress";
    } else if (listArgs.includes("done")) {
        status = "done";
    }

    if (status === "any") {
        tasks.forEach((task) => {
            printTask(task, verbose);
        });
    } else {
        tasks.forEach((task) => {
            if (task.status === status) {
                printTask(task, verbose);
            }
        });
    }
}

export function update(argv: string[]) {
    if (argv.length < 4) {
        console.error("Not enough arguments.\nUsage: npm start update <task ID> <description>");
        return;
    }

    const id: number = Number(argv[3]) - 1;
    if (!Number.isInteger(id)) {
        console.error("ID must be an integer.");
        return;
    }

    if (argv.length < 5) {
        console.error("Updated description missing.\nUsage: npm start update <task ID> <description>");
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

function printTask(task: taskType, verbose: boolean = false) {
    if (verbose) {
        console.log(`${task.id}. ${task.description}\nStatus: ${task.status}\nCreated: ${task.createdAt}\nUpdated: ${task.updatedAt}\n`);
    } else {
        console.log(`${task.id}. ${task.status}: ${task.description}`);
    }
}