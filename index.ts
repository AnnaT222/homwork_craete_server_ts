import fs from 'fs';
import http, { IncomingMessage, ServerResponse } from "http";
import exportFiles from './postFile';
import { getConvertedFiles, getFileData } from './getFile';
import deleteFile from './delete';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    res.writeHead(200)
    let url = req.url!;
    const method = req.method!;
    let file_name: string = url.slice(7)
    if (url === "/exports" && method === "POST") {
        //   postFile Function  // ---------------------------------------------------------------------------------
        exportFiles(url)
        //     // --------------------------------------------------------------------------------------------------
        return res.end("You've successfully converted files")
    } else if (url === "/files" && method === "GET") {
        // GET function 1-------------------------------------------------------------------------------------------------
        let file_name: string = url.slice(7)
        getConvertedFiles(res, file_name)
        // -----------------------------------------------------------------------------------------------------------
    } else if (typeof (url) == "string" && url.startsWith("/files/") && method === "GET") {
        let file_name: string = url.slice(7)
        if (fs.existsSync(`./exports/${file_name}`)) {
            // GET function 2-----------------------------------------------------------------
            getFileData(res, file_name)
            // --------------------------------------------------------------------------------------------------------------------
        } else {
            return res.end("File doesn't found")
        }

    } else if (typeof (url) == "string" && url.startsWith("/files/") && method === "DELETE") {
        if (fs.existsSync(`./exports/${file_name}`)) {
            // DELETE function deleteFile -----------------------------------------------------------------
            deleteFile(res, file_name)
            // --------------------------------------------------------------------------------------------------------------------
        } else {
            return res.end("File doesn't found")
        }
    } else {
        return res.end("File doesn't found")
    }
})


server.listen(3000, () => {
    console.log("the Server is listening to given port");
})