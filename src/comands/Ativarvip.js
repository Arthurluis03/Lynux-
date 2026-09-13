import fs from "node:fs";
import path from "node:path";

const ID_CARGO_ACTIVE = process.env.ACTIVE;
const ID_CATEGORIA_VIPS = process.env.CATEGORIA_VIPS;

const caminhoDados = path.resolve(
    "src/data/vipData.json"
);

function Dados_Carregar() {

    if (!fs.existsSync(caminhoDados)) {
        fs.writeFileSync(
            caminhoDados,
            "{}"
        );
    }

    return JSON.parse(
        fs.readFileSync(caminhoDados, "utf8")
    );
}

function Dados_Salvar(dados) {

    fs.writeFileSync(
        caminhoDados,
        JSON.stringify(dados, null, 4)
    );
}

export default {

    name: "vipAtivar",

    async execute(message) {

        const membro = message.member;

        if (!membro.roles.cache.has(ID_CARGO_ACTIVE)) {
            return message.reply(
                "Você não possui o cargo Active."
            );
        }

        const categoria =
            message.guild.channels.cache.get(
                ID_CATEGORIA_VIPS
            );

        if (!categoria) {
            return message.reply(
                "Não encontrei a categoria Vips."
            );
        }

        const dados = Dados_Carregar();

        if (dados[membro.id]) {
            return message.reply(
                "Você já possui um VIP ativo."
            );
        }

        const Cargo_Nome =
            `${membro.displayName} call's`;

        try {

            const Cargo_Criar =
                await message.guild.roles.create({
                    name: Cargo_Nome,
                    reason:
                        `VIP ativado por ${membro.user.tag}`
                });

            const Call_Criar =
                await message.guild.channels.create({
                    name: Cargo_Nome,
                    type: 2,
                    parent: ID_CATEGORIA_VIPS,

                    permissionOverwrites: [
                        {
                            id: message.guild.roles.everyone.id,
                            deny: [
                                "ViewChannel",
                                "Connect"
                            ]
                        },
                        {
                            id: Cargo_Criar.id,
                            allow: [
                                "ViewChannel",
                                "Connect",
                                "Speak",
                                "Stream",
                                "UseVAD",
                                "MoveMembers",
                                "MuteMembers",
                                "DeafenMembers",
                                "ManageChannels"
                            ]
                        }
                    ]
                });

            await membro.roles.remove(
                ID_CARGO_ACTIVE
            );

            await membro.roles.add(
                Cargo_Criar
            );

            dados[membro.id] = {
                cargoId: Cargo_Criar.id,
                callId: Call_Criar.id
            };

            Dados_Salvar(dados);

            return message.reply(
                `VIP ativado!\n\n` +
                `Agora você tem uma call totalmente sua ` +
                `na categoria **Vips**.\n` +
                `Agora você pode configurar sua call ao seu gosto.`
            );

        } catch (error) {

            console.error(
                "Erro ao ativar VIP:",
                error
            );

            return message.reply(
                "Não consegui ativar seu VIP."
            );
        }
    }
};