import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/vipData.json"
);

export default {

    name: "setVIP",

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

        const Cargo_VIP = message.guild.roles.cache.get(
            VIP.cargoId
        );

        if (!Cargo_VIP) {
            return message.reply(
                "Não encontrei o seu cargo VIP."
            );
        }

        const Usuario = message.mentions.members.first();

        if (!Usuario) {
            return message.reply(
                "Você precisa mencionar alguém."
            );
        }

        if (Usuario.id === message.author.id) {
            return message.reply(
                "Você já possui o seu próprio cargo VIP."
            );
        }

        if (Usuario.roles.cache.has(Cargo_VIP.id)) {
            return message.reply(
                "Esse usuário já possui acesso à sua call."
            );
        }

        const Membros_VIP = Cargo_VIP.members.size;

        if (Membros_VIP >= 7) {
            return message.reply(
                "Seu VIP já atingiu o limite de 6 pessoas."
            );
        }

        try {

            await Usuario.roles.add(Cargo_VIP);

            VIP.membros = VIP.membros || [];

            if (!VIP.membros.includes(Usuario.id)) {
                VIP.membros.push(Usuario.id);
            }

            fs.writeFileSync(
                caminhoDados,
                JSON.stringify(dados, null, 4)
            );

            return message.reply(
                `${Usuario} agora possui acesso à sua call VIP.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo VIP."
            );
        }
    }
};