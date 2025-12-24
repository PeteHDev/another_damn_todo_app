import fs from "fs";

export type taskType = {
    id: number,
    description: string,
};

export function readTasksFromJSON(pathFile: string = "./tasks/tasks.json"): taskType[] {
    let tasks: taskType[] = [];
    if (fs.existsSync("./tasks/tasks.json")) {
        try {
            const data = fs.readFileSync("./tasks/tasks.json");
            tasks = JSON.parse(data.toString());
        } catch (err) {
            console.error("Error reading tasks: ", err);
        }
    }

    return tasks;
}

export function writeTasksToJSON(tasks: taskType[]) {
    if (!fs.existsSync("./tasks")) {
        fs.mkdirSync("./tasks");
    }
    
    fs.writeFileSync("./tasks/tasks.json", JSON.stringify(tasks, null, 4));
}