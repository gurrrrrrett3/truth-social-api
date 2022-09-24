import { db } from "../index";
import { clients } from "..";
import Util from "../util";
import Status from "../modules/objects/status";

export default async function favorite() {

  clients.forEach(async (client) => {

  const trends = await client.trends.get().catch((e) => console.log(e));
  if (!trends) return;

  let statuses: Status[] = [];

  for (const trend of trends) {
    const posts = await client.timeline.tag(trend.name).catch((e) => console.log(e));
    if (!posts) return;

    posts.forEach((post) => {
      statuses.push(post);
    })
  }

  console.log("Found", statuses.length, "statuses to favorite");

  statuses = Util.randomizeArray(statuses).slice(20);

  let promises: Promise<void>[] = [];

  for (const status of statuses) {
    const p = new Promise<void>(async (resolve, reject) => {
    let isRateLimited = false;

    await client.status.favorite(status.id).catch(() => {
      console.log("Ratelimited trying to favorite", status.id);
      isRateLimited = true;
    });

    console.log("Favorited", status.id);

    await db.post
      .upsert({
        where: {
          id: status.id,
        },
        create: {
          id: status.id,
          content: status.content,
          createdAt: status.createdAt,
          favorited: !isRateLimited,
          author: {
            connectOrCreate: {
              where: {
                id: status.account.id,
              },
              create: {
                id: status.account.id,
                avatar: status.account.avatar,
                tag: status.account.acct,
                following: false,
                username: status.account.displayName,
                note: status.account.note,
                verified: false,
              },
            },
          },
        },
        update: {
          favorited: !isRateLimited,
        },
      })
      .catch((e) => reject(`Prisma err go brrr`));
    })

    promises.push(p);
  }

  await Promise.all(promises).catch((e) => console.log(e));

  })
}
