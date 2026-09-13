const ID_CARGO_INFINITE = "1548443135980474439";

export default {
    name: "setInfinite",

    async execute(message) {

        const membro = message.mentions.members.first();

        if (!membro) {
            return message.reply("Você precisa mencionar alguém.");
        }

        const cargo = message.guild.roles.cache.get(
            ID_CARGO_INFINITE
        );

        if (!cargo) {
            return message.reply("Não encontrei o cargo Infinite.");
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