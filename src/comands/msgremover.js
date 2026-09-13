import fs from "node:fs";
import path from "node:path";

const caminhoDados = path.resolve("src/data/messageData.json");

const ID_ADM = "775443621427019806";

export default {
    name: "msgremover",

    execute(message) {

        if (message.author.id !== ID_ADM) {
            return;
        }

        const partes = message.content
            .trim()
            .split(/\s+/);

        const userId = partes[1];
        const quantidadeTexto = partes[2];

        if (!userId || !quantidadeTexto) {
            return;
        }

        const dados = JSON.parse(
            fs.readFileSync(caminhoDados, "utf8")
        );

        if (!dados[userId]) {
            return;
        }

        if (quantidadeTexto.toLowerCase() === "all") {

            dados[userId] = 0;

        } else {

            const quantidade = Number(quantidadeTexto);

            if (
                !Number.isInteger(quantidade) ||
                quantidade < 1
            ) {
                return;
            }

            dados[userId] -= quantidade;

            if (dados[userId] < 0) {
                dados[userId] = 0;
            }
        }

        fs.writeFileSync(
            caminhoDados,
            JSON.stringify(dados, null, 4)
        );
    }
};