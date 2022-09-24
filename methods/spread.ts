import { db } from "../index";
import { clients } from "..";


export default async function spread(count: number) {
    clients.forEach(async (client) => {
      if (!client.isLoggedIn()) return;
  
      const suggestions = await client.carousels.suggestions(count).catch((e) => console.log(e));
    
      if (!suggestions) return;
    
      for (const suggestion of suggestions) {
        let isRateLimited = false;
        await client.account.follow(suggestion.account_id).catch(() => {
          console.log("Ratelimited trying to follow", suggestion.display_name);
          isRateLimited = true;
        });
  
        console.log("Followed", suggestion.display_name);
        
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
    })
  }