import fs from "node:fs";
import path from "node:path";
import { getSearchIndex } from "../src/content/load-knowledge";

async function main() {
  const searchIndex = await getSearchIndex();
  const publicDir = path.join(process.cwd(), "public");
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(searchIndex, null, 2),
    "utf8"
  );
  console.log(`Search index written with ${searchIndex.length} items.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
