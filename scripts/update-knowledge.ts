import replaceVectoryStore from "../src/services/openai/replaceVectorStore.js";
import "dotenv/config";
import { toFile } from "openai/uploads.mjs";
import getBmBlogUploadables from "../src/lib/getBmBlogUploadables.js";
import getTrDocsUploadables from "../src/lib/getTrDocsUploadables.js";

const apiDocs = await toFile(
  fetch(
    "https://raw.githubusercontent.com/beeminder/apidocs/master/source/index.html.md",
  ),
  "apidocs.md",
);

await replaceVectoryStore("knowledge", [
  apiDocs,
  ...(await getTrDocsUploadables()),
  ...(await getBmBlogUploadables()),
]);
