import TruthSocialClient from "./modules/client";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import spread from "./methods/spread";
import favorite from "./methods/favorite";

dotenv.config();

export const tClient = new TruthSocialClient({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

export const db = new PrismaClient();

// @ts-ignore
Array.prototype.randomize = function () {
  const newArray = this.slice(0);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

setTimeout(async () => {
  await spread(5);
  await favorite();
}, 1000);

setInterval(async () => {
  spread(5);
  favorite();
}, 60000);
