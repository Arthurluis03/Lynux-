const ID_CARGO_VIP = process.env.VIP;

export default {
    name: "vip",

    async execute(message) {

        if (message.author.id !== "775443621427019806") {
            return;
        }

        const membro = message.mentions.members.first();

        if (!membro) {
            return message.reply("Você precisa mencionar alguém!");
        }

        const cargo = message.guild.roles.cache.get(
            ID_CARGO_VIP
        );

        if (!cargo) {
            return message.reply(
                "Não encontrei o cargo VIP."
            );
        }

        try {

            await membro.roles.add(cargo);

            message.reply(
                `${membro} agora é VIP!`
            );

        } catch (error) {

            console.error(error);

            message.reply(
                "Não consegui adicionar o cargo VIP."
            );
        }
    }
};