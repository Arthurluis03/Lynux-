import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/vipData.json"
);

const CARGOS_PERMITIDOS = [
    process.env.CARGO_OWNER,
    process.env.CARGO_7NEVER,
    process.env.CARGO_SUB_OWNER,
    process.env.CARGO_GOAT_ADM,

    // Adicionar novos cargos permitidos aqui
];

const ID_CARGO_ACTIVE = process.env.ACTIVE;

export default {

    name: "resetvip",

    async execute(message) {

        const Tem_Permissao = CARGOS_PERMITIDOS.some(
            cargoId =>
                cargoId &&
                message.member.roles.cache.has(cargoId)
        );

        if (!Tem_Permissao) {
            return;
        }

        const Usuario = message.mentions.members.first();

        if (!Usuario) {
            return message.reply(
                "Você precisa mencionar o usuário."
            );
        }

        if (!fs.existsSync(caminhoDados)) {
            return message.reply(
                "Não existem VIPs registrados."
            );
        }

        const dados = JSON.parse(
            fs.readFileSync(caminhoDados, "utf8")
        );

        const VIP = dados[Usuario.id];

        if (!VIP) {
            return message.reply(
                "Esse usuário não possui um VIP ativo."
            );
        }

        try {

            const Cargo_VIP =
                message.guild.roles.cache.get(
                    VIP.cargoId
                );

            const Call_VIP =
                message.guild.channels.cache.get(
                    VIP.callId
                );

            if (Cargo_VIP) {

                if (
                    Usuario.roles.cache.has(
                        Cargo_VIP.id
                    )
                ) {
                    await Usuario.roles.remove(
                        Cargo_VIP
                    );
                }

                await Cargo_VIP.delete(
                    "VIP resetado por administrador"
                );
            }

            if (Call_VIP) {

                await Call_VIP.delete(
                    "VIP resetado por administrador"
                );
            }

            const Cargo_Active =
                message.guild.roles.cache.get(
                    ID_CARGO_ACTIVE
                );

            if (Cargo_Active) {

                await Usuario.roles.add(
                    Cargo_Active
                );
            }

            delete dados[Usuario.id];

            fs.writeFileSync(
                caminhoDados,
                JSON.stringify(dados, null, 4)
            );

            return message.reply(
                `O VIP de ${Usuario} foi resetado com sucesso.\n` +
                `O cargo Active foi devolvido.`
            );

        } catch (error) {

            console.error(
                "Erro ao resetar VIP:",
                error
            );

            return message.reply(
                "Não consegui resetar o VIP."
            );
        }
    }
};