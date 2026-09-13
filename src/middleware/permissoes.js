const Cargos_Permitidos = [
    process.env.CARGO_OWNER,
    process.env.CARGO_7NEVER,
    process.env.CARGO_SUB_OWNER,
    process.env.CARGO_GOAT_ADM,

    // Adicionar novos cargos permitidos aqui depois
];

const IDs_Permitidos = [
    process.env.BATATA_CREATE,

    // Adicionar novos IDs permitidos aqui depois
];

export function Permissao_Verificar(message) {

    if (IDs_Permitidos.includes(message.author.id)) {
        return true;
    }

    return Cargos_Permitidos.some(
        cargoId => message.member.roles.cache.has(cargoId)
    );
}