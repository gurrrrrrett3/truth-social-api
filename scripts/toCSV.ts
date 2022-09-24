import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();

async function main() {
  const keys = Object.keys(db).filter((key) => !key.includes("$") && !key.includes("_"));

  for (const key of keys) {
    // @ts-ignore
    const model: any = db[key];

    const rows = await model.findMany();

    const keys = Object.keys(rows[0]);

    const csv =
      keys.join(",") +
      "\n" +
      rows
        .map((row: any) =>
          keys
            .map((key) => row[key])
            .map((v: string, i) => {
              v = typeof v == "string" ? v.replace(/,/g, "[comma]") : v;
              return v
            })
            .join(",")
        )
        .join("\n");

    fs.writeFileSync(`./csv/${key}.csv`, csv);
  }
}

main();
