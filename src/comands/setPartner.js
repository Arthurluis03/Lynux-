import { Permissao_Verificar } from "../middleware/permissoes.js";

const ID_CARGO_PARTNER = "1544851524042367066";

export default {
    name: "setPartner",

    async execute(message) {

        if (!Permissao_Verificar(message)) {
            return message.reply(
                "Você não tem permissão pra isso."
            );
        }

        const membro = message.mentions.members.first();

        if (!membro) {
            return message.reply(
                "Você precisa mencionar alguém."
            );
        }

        const cargo = await message.guild.roles.fetch(
            ID_CARGO_PARTNER
        ).catch(() => null);

        if (!cargo) {
            return message.reply(
                "Não encontrei o cargo Partner neste servidor."
            );
        }

        try {

            await membro.roles.add(cargo);

            return message.reply(
                `${membro} agora possui o cargo Partner.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo Partner. "
            );
        }
    }
};