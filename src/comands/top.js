import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve(
    "src/data/welcomeData.json"
);

function Dados_Carregar() {
    return JSON.parse(
        fs.readFileSync(caminhoDados, "utf8")
    );
}

export default {
    name: "top",

    async execute(message) {

        const dados = Dados_Carregar();

        const ranking = Object.entries(dados)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        if (ranking.length === 0) {
            return message.reply(
                "Ainda não existem pontos de boas-vindas."
            );
        }

        let resposta = "TOP DE BOAS VINDAS\n\n";

        for (let i = 0; i < ranking.length; i++) {

            const [userId, pontos] = ranking[i];

            const membro = await message.guild.members
                .fetch(userId)
                .catch(() => null);

            const nome = membro
                ? membro.displayName
                : "Usuário desconhecido";

            resposta += `${i + 1}. ${nome} — ${pontos} pontos\n`;
        }

        return message.reply(resposta);
    }
};