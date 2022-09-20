import { db } from "../index";
import { tClient } from "..";
import Util from "../util";
import Status from "../modules/objects/status";

export default async function favorite() {
  const trends = await tClient.trends.get().catch((e) => console.log(e));
  if (!trends) return;

  trends.slice(5).forEach(async (trend) => {
    const posts = await tClient.timeline.tag(trend.name).catch((e) => console.log(e));

    if (!posts) return;

    // @ts-ignore
    const rPosts = posts.randomize().slice(50) as Status[];

    rPosts.forEach(async (post) => {
      let isRateLimited = false;

     const choice = Math.floor(Math.random() * 10);

      if (choice < 9) {
        if (post.favourited) return;
        
        await post.favorite().catch(() => {
          console.log("Ratelimited trying to favorite", post.id);
          isRateLimited = true;
        });
      } else {
        if (post.favourited) return;

        await post.favorite().catch(() => {
          console.log("Ratelimited trying to favorite", post.id);
          isRateLimited = true;
        });

        await post.reblog().catch(() => {
          console.log("Ratelimited trying to reblog", post.id);
          isRateLimited = true;
        });
      }

      await db.post
        .upsert({
          where: {
            id: post.id,
          },
          create: {
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,
            favorited: !isRateLimited,
            author: {
              connectOrCreate: {
                where: {
                  id: post.account.id,
                },
                create: {
                  id: post.account.id,
                  avatar: post.account.avatar,
                  tag: post.account.acct,
                  following: false,
                  username: post.account.displayName,
                  note: post.account.note,
                  verified: false,
                },
              },
            },
          },
          update: {
            favorited: !isRateLimited,
          },
        })
        .catch((e) => `Prisma err go brrr`);
    });
  });
}
