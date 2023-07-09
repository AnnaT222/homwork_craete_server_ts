import fs from "fs";
import path from "path";
import { ServerResponse } from "http";

export function getConvertedFiles(res: ServerResponse, file_name: string) {

    if (fs.existsSync(path.join("./exports"))) {
        const converteds = fs.readdirSync("./exports").filter((e) => path.extname(e) === ".json")
        converteds.forEach((converted) => {
            res.write(`${converted}\n`)
        });
        res.end("You've got converted files successfuly")
    } else {
        res.end("There isn't any converted files")
    }

}


export function getFileData(res: ServerResponse, file_name: string) {
    const searched_json = fs.readdirSync("./exports").find((e) => e === file_name)!
    let readed = fs.readFileSync(path.resolve("exports", searched_json))
    res.write(readed)
    res.end("You've read the file successfully")

}