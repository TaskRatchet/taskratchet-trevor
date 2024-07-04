import fs from "fs";
import path from "path";
import replaceVectoryStore from "../src/services/openai/replaceVectorStore.js";
import "dotenv/config";
import { Uploadable, toFile } from "openai/uploads.mjs";
import pLimit from "p-limit";

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

const streams = mdFiles.map((f) => fs.createReadStream(f));

const blogConfig = await fetch(
  "https://raw.githubusercontent.com/beeminder/blog/master/posts.json",
).then((r) => r.json());

const sources: string[] = blogConfig.map((b: Record<string, unknown>) => {
  const url = new URL(`https://${b.source}`);
  url.hostname = process.env.ETHERPAD_DOMAIN || "";
  url.pathname = url.pathname + "/export/txt";
  return url.toString();
});

const limit = pLimit(1);

const uploadables: Uploadable[] = await Promise.all(
  sources.map((s, i) => {
    const pathname = new URL(s).pathname;
    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[0];
    return toFile(
      limit(async () => {
        const k = `${i + 1}/${sources.length}: ${slug}`;
        console.time(k);
        const r = await fetch(s);
        console.timeEnd(k);
        return r;
      }),
      `${slug}.md`,
    );
  }),
);

await replaceVectoryStore("knowledge", [...streams, ...uploadables]);
