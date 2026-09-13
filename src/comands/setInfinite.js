import { temPermissao } from "./permissoes.js";

const ID_CARGO_INFINITE = "1537100097022730343";

export default {
    name: "setInfinite",

    async execute(message) {

        if (!temPermissao(message)) {
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
            ID_CARGO_INFINITE
        ).catch(() => null);

        if (!cargo) {
            return message.reply(
                "Não encontrei o cargo Infinite neste servidor."
            );
        }

        try {

            await membro.roles.add(cargo);

            return message.reply(
                `${membro} agora possui o cargo Infinite.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo Infinite."
            );
        }
    }
};