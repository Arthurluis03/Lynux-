import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import messageCreate from "./events/messageCreate.js";

console.log("PASTA ATUAL:", process.cwd());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});



messageCreate(client);

client.once("clientReady", async () => {

    console.log(`${client.user.tag} está online!`);

    console.log("SERVIDORES: ");

    client.guilds.cache.forEach((guild) => {
        console.log(
            guild.name,
            "-",
            guild.id
        );
    });

});

client.login(process.env.MEU_TOKEN);