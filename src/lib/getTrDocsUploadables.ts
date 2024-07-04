import fs from "fs";
import { Uploadable } from "openai/uploads.mjs";
import path from "path";

export default async function getTrDocsUploadables(): Promise<Uploadable[]> {
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

  return mdFiles.map((f) => fs.createReadStream(f));
}
