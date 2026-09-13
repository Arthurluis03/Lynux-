import { Permissao_Verificar } from "../middleware/permissoes.js";

const ID_CARGO_ROYAL = "1544850668429246575";

export default {
    name: "setRoyal",

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
            ID_CARGO_ROYAL
        ).catch(() => null);

        if (!cargo) {
            return message.reply(
                "Não encontrei o cargo Royal neste servidor."
            );
        }

        try {

            await membro.roles.add(cargo);

            return message.reply(
                `${membro} agora possui o cargo Royal.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo Royal."
            );
        }
    }
};