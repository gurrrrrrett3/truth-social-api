import TruthSocialClient from "./modules/client";
import dotenv from "dotenv";
import fs from "fs";
import Status from "./modules/objects/status";

dotenv.config();

export const tClient = new TruthSocialClient({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});



//setInterval(async () => spread(5), 1000);
setTimeout(async () => getTrends(), 1000);

setTimeout(async () => {

    const favorites = tClient.favorites.get(1000)
    console.log((await favorites).length)

}, 1000);

async function spread(count: number) {
  if (!tClient.isLoggedIn()) return;

  const suggestions = await tClient.carousels.suggestions(count);

  for (const suggestion of suggestions) {
    let isRateLimited = false;
    await tClient.account.follow(suggestion.account_id).catch(() => {
      console.log("Ratelimited trying to follow", suggestion.display_name);
      isRateLimited = true;
    });
    if (!isRateLimited) console.log("Followed", suggestion.display_name);
  }


 
}

async function getTrends() {
let posts: Status[] = [];
    const trends = await tClient.trends.get()
    trends.slice(5).forEach(async (trend) => {
      const posts = await tClient.timeline.tag(trend.name);
          posts.forEach(async (post) => {
            posts.push(post);
           await post.favorite()
          });
    });
  
    console.log("Found", posts.length, "posts");


    posts.forEach(async (post) => {await post.favorite()

        console.log("Favorited", post.id)
    });
}
