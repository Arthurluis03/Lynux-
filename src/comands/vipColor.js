import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/vipData.json"
);

export default {

    name: "vipColor",

    async execute(message) {

        const dados = JSON.parse(
            fs.readFileSync(caminhoDados, "utf8")
        );

        const VIP = dados[message.author.id];

        if (!VIP) {
            return message.reply(
                "Você não possui um VIP ativo."
            );
        }

        const Cor = message.content
            .slice("!vipColor".length)
            .trim();

        if (!/^#[0-9A-Fa-f]{6}$/.test(Cor)) {
            return message.reply(
                "Use uma cor no formato #ffffff."
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

        try {

            await Cargo.setColor(Cor);

            return message.reply(
                `A cor do seu VIP foi alterada para **${Cor}**.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui alterar a cor do seu VIP."
            );
        }
    }
};