const CARGOS_PERMITIDOS = [
    process.env.CARGO_OWNER,
    process.env.CARGO_7NEVER,
    process.env.CARGO_SUB_OWNER,
    process.env.CARGO_GOAT_ADM,
    process.env.CARGO_SUP
];

const ID_POTATO = process.env.BATATA_CREATE;

export function temPermissao(message) {

    return message.member.roles.cache.some(
        role => CARGOS_PERMITIDOS.includes(role.id)
    );

}

export function isPotato(message) {

    return message.author.id === ID_POTATO;

}