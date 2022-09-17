import TruthSocialClient from "./modules/client";
import dotenv from "dotenv";

dotenv.config();

const tClient = new TruthSocialClient({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});


setInterval(async () => spread(5), 1000);


async function spread(count: number) {
    if (!tClient.isLoggedIn()) return
  
    const suggestions = await tClient.carousels.suggestions(count)

    for (const suggestion of suggestions) {
        await tClient.account.follow(suggestion.account_id).catch(() => {console.log("Ratelimited trying to follow", suggestion.display_name)})
    }
    
}