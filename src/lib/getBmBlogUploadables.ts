import "dotenv/config";
import { Uploadable, toFile } from "openai/uploads.mjs";
import pLimit from "p-limit";

export default async function getBmBlogUploadables(): Promise<Uploadable[]> {
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

  return Promise.all(
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
}
