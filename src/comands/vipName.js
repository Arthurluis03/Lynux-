import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/vipData.json"
);

export default {

    name: "vipName",

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

        const Cargo = message.guild.roles.cache.get(
            VIP.cargoId
        );

        if (!Cargo) {
            return message.reply(
                "O cargo do seu VIP não foi encontrado."
            );
        }

        const Nome = message.content
            .slice("!vipName".length)
            .trim();

        if (!Nome) {
            return message.reply(
                "Use: !vipName Nome"
            );
        }

        try {

            await Cargo.setName(Nome);

            return message.reply(
                `O nome do seu VIP foi alterado para **${Nome}**.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui alterar o nome do seu VIP. "
            );
        }
    }
};