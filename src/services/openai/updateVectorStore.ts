import { ReadStream } from "fs";
import getClient from "./getClient.js";

export default async function updateVectorStore(streams: ReadStream[]) {
  const c = getClient();

  const stores = await c.beta.vectorStores.list();

  for (const store of stores.data) {
    if (store.name === "taskratchet.com") {
      await c.beta.vectorStores.del(store.id);
    }
  }

  const store = await c.beta.vectorStores.create({
    name: "taskratchet.com",
  });

  await c.beta.vectorStores.fileBatches.uploadAndPoll(store.id, {
    files: streams,
  });

  await c.beta.assistants.update(process.env.OPENAI_ASSISTANT_ID || "", {
    tool_resources: { file_search: { vector_store_ids: [store.id] } },
  });
}
