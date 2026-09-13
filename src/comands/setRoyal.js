const ID_CARGO_ROYAL = "1548443135980474439";

export default {
    name: "setRoyal",

    async execute(message) {

        const membro = message.mentions.members.first();

        if (!membro) {
            return message.reply("Você precisa mencionar alguém.");
        }

        const cargo = message.guild.roles.cache.get(
            ID_CARGO_ROYAL
        );

        if (!cargo) {
            return message.reply("Não encontrei o cargo Royal.");
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