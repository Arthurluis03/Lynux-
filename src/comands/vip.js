import { Permissao_Verificar } from "../middleware/permissoes.js";

const ID_CARGO_ACTIVE = process.env.ACTIVE;

export default {
    name: "vip",

    async execute(message) {

        if (!Permissao_Verificar(message)) {
            return;
        }

        const membro = message.mentions.members.first();

        if (!membro) {
            return message.reply(
                "Você precisa mencionar alguém."
            );
        }

        const cargo = message.guild.roles.cache.get(
            ID_CARGO_ACTIVE
        );

        if (!cargo) {
            return message.reply(
                "Não encontrei o cargo Active. "
            );
        }

        try {

            await membro.roles.add(cargo);

            return message.reply(
                `${membro} recebeu o cargo Active.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo Active."
            );
        }
    }
};