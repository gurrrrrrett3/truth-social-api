import { db } from "../index";
import { tClient } from "..";


export default async function spread(count: number) {
    if (!tClient.isLoggedIn()) return;
  
    const suggestions = await tClient.carousels.suggestions(count).catch((e) => console.log(e));
  
    if (!suggestions) return;
  
    for (const suggestion of suggestions) {
      let isRateLimited = false;
      await tClient.account.follow(suggestion.account_id).catch(() => {
        console.log("Ratelimited trying to follow", suggestion.display_name);
        isRateLimited = true;
      });

      
      await db.user.upsert({
        where: {
            id: suggestion.account_id
        },
        create: {
            id: suggestion.account_id,
            tag: suggestion.acct,
            username: suggestion.display_name,
            avatar: suggestion.account_avatar,
            note: suggestion.note,
            verified: suggestion.verified,

            following: !isRateLimited
        },
        update: {
            id: suggestion.account_id,
            tag: suggestion.acct,
            username: suggestion.display_name,
            avatar: suggestion.account_avatar,
            note: suggestion.note,
            verified: suggestion.verified,

            following: !isRateLimited
        }
      }).catch((e) => `Prisma err go brrr`);


    }
  }