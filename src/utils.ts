import fs from "fs";

export type taskType = {
    id: number,
    description: string,
};

export function writeToJSON(task: string) {
    if (!fs.existsSync("./tasks")) {
        fs.mkdirSync("./tasks");
    }
    let tasks: taskType[] = [];

    if (fs.existsSync("./tasks/tasks.json")) {
        const data = fs.readFileSync("./tasks/tasks.json");
        tasks = JSON.parse(data.toString());
    }

    const newTask: taskType = {
        id: (tasks.length == 0) ? 1 : tasks.length + 1,
        description: task,
    };

    tasks.push(newTask);
    fs.writeFileSync("./tasks/tasks.json", JSON.stringify(tasks, null, 4));
}