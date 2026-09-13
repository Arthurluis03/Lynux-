import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/vipData.json"
);

export default {

    name: "vipCall",

    async execute(message) {

        if (!fs.existsSync(caminhoDados)) {
            return message.reply(
                "Você não possui um VIP ativo."
            );
        }

        const dados = JSON.parse(
            fs.readFileSync(caminhoDados, "utf8")
        );

        const VIP = dados[message.author.id];

        if (!VIP) {
            return message.reply(
                "Você não possui um VIP ativo."
            );
        }

        const Call_VIP = message.guild.channels.cache.get(
            VIP.callId
        );

        if (!Call_VIP) {
            return message.reply(
                "Não encontrei sua call VIP."
            );
        }

        const Nome = message.content
            .slice("!vipCall".length)
            .trim();

        if (!Nome) {
            return message.reply(
                "Use: !vipCall Nome"
            );
        }

        try {

            await Call_VIP.setName(Nome);

            return message.reply(
                `O nome da sua call foi alterado para **${Nome}**.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui alterar o nome da sua call."
            );
        }
    }
};