import fs from "fs";
import path from "path";
import updateVectorStore from "../src/services/openai/updateVectorStore.js";
import "dotenv/config";

function getAllMdFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllMdFiles(filePath, arrayOfFiles);
    } else if (path.extname(file) === ".md") {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

const mdFiles = getAllMdFiles("./submodules/taskratchet.com");

console.log(mdFiles);

const streams = mdFiles.map((f) => fs.createReadStream(f));

await updateVectorStore("taskratchet.com", streams);
