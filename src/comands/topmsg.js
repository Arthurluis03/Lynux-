import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/messageData.json"
);

function Dados_Carregar() {
    return JSON.parse(
        fs.readFileSync(caminhoDados, "utf8")
    );
}

export default {
    name: "topmsg",

    async execute(message) {

        const dados = Dados_Carregar();

        const ranking = Object.entries(dados)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        if (ranking.length === 0) {
            return message.reply(
                "Ainda não existem mensagens registradas."
            );
        }

        let resposta = "TOP MENSAGENS\n\n";

        for (let i = 0; i < ranking.length; i++) {

            const [userId, mensagens] = ranking[i];

            const membro = await message.guild.members
                .fetch(userId)
                .catch(() => null);

            const nome = membro
                ? membro.displayName
                : "Usuário desconhecido";

            resposta += `${i + 1}. ${nome} — ${mensagens} mensagens\n`;
        }

        return message.reply(resposta);
    }
};