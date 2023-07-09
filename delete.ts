import fs from "fs";
import path from "path";
import { ServerResponse } from "http";

export default function deleteFile(res: ServerResponse, file_name: string) {
    const searched_json = fs.readdirSync("./exports").find((e) => e === file_name)!
    fs.unlinkSync(path.resolve("exports", searched_json))
    res.write(`${searched_json} is deleted`)
    res.end()
}