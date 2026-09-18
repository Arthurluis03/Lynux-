export default {
    name: "purge",

    async execute(message) {

        if (message.author.id !== "775443621427019806" ) {
            return;
        }

        const partes = message.content
            .trim()
            .split(/\s+/);

        let quantidade;

        if (!partes[1]) {
            quantidade = 100;
        } else if (partes[1].toLowerCase() === "all") {
            quantidade = 255;
        } else {
            quantidade = Number(partes[1]);
        }

        if (
            !Number.isInteger(quantidade) ||
            quantidade < 1
        ) {
            return;
        }

        if (quantidade > 255) {
            quantidade = 255;
        }

        try {

            let restantes = quantidade;

            while (restantes > 0) {

                const mensagens =
                    await message.channel.messages.fetch({
                        limit: 100
                    });

                const mensagensRemover =
                    Array.from(
                        mensagens.values()
                    ).slice(
                        0,
                        Math.min(restantes, 100)
                    );

                if (mensagensRemover.length === 0) {
                    break;
                }

                await message.channel.bulkDelete(
                    mensagensRemover,
                    true
                );

                restantes -= mensagensRemover.length;

                if (mensagensRemover.length < 100) {
                    break;
                }
            }

        } catch (error) {

            console.error(
                "Erro ao executar purge:",
                error
            );
        }
    }
};