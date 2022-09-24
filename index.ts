import TruthSocialClient from "./modules/client";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import spread from "./methods/spread";
import favorite from "./methods/favorite";
import Time, { ms } from "./time";
import accounts from "./accounts.json";

dotenv.config();

export const clients: TruthSocialClient[] = [];

accounts.forEach((account) => {
  clients.push(
    new TruthSocialClient(account)
  );
});

export const db = new PrismaClient();

setTimeout(async () => {
  await spread(5);
  await favorite();
}, ms("1 second"));

setInterval(async () => {
  console.log("Running tick");
  await spread(10);
  await favorite();
}, ms("10 minutes"));
