const CARGOS_PERMITIDOS = [
    process.env.CARGO_OWNER,
    process.env.CARGO_7NEVER,
    process.env.CARGO_SUB_OWNER,
    process.env.CARGO_GOAT_ADM,
    process.env.CARGO_SUP
];

export function Permissao_Verificar(message) {

    return message.member.roles.cache.some(
        role => CARGOS_PERMITIDOS.includes(role.id)
    );

}

export function Potato_Verificar(message) {

    return message.author.id === process.env.BATATA_CREATE;

}