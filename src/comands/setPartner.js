const ID_CARGO_PARTNER = "1548443135980474439";

export default {
    name: "setPartner",

    async execute(message) {

        const membro = message.mentions.members.first();

        if (!membro) {
            return message.reply("Você precisa mencionar alguém.");
        }

        const cargo = message.guild.roles.cache.get(
            ID_CARGO_PARTNER
        );

        if (!cargo) {
            return message.reply("Não encontrei o cargo Partner.");
        }

        try {

            await membro.roles.add(cargo);

            return message.reply(
                `${membro} agora possui o cargo Partner.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo Partner."
            );
        }
    }
};