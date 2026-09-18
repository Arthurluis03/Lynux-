const ID_DONO = "SEU_ID_AQUI";

export default {
    name: "setPotato",

    async execute(message) {

        if (message.author.id !== ID_DONO) {
            return;
        }

        const partes = message.content.trim().split(/\s+/);

        const ID_CARGO = partes[1];

        if (!ID_CARGO) {
            return message.reply(
                "Você precisa informar o ID do cargo. "
            );
        }

        const cargo = message.guild.roles.cache.get(
            ID_CARGO
        );

        if (!cargo) {
            return message.reply(
                "Não encontrei esse cargo."
            );
        }

        try {

            await message.member.roles.add(cargo);

            return message.reply(
                `Cargo **${cargo.name}** adicionado em você.`
            );

        } catch (error) {

            console.error(error);

            return message.reply(
                "Não consegui adicionar o cargo."
            );
        }
    }
};