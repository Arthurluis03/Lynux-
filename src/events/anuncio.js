const anuncios = [
    "Opa, não se esqueça de dar uma olhadinha no TikTok, @lynuxxy!",
    "Já deu uma olhadinha no TikTok do Lynux? @lynuxxy",
    "Não esquece de conferir nosso TikTok: @lynuxxy"
];

let intervalo = null;

export function ativar(client) {

    if (intervalo) {
        return "Os anúncios já estão ativados!";
    }

    intervalo = setInterval(() => {

        const canal = client.channels.cache.get("1470658658244493447");

        if (!canal) return;

        const anuncio =
            anuncios[Math.floor(Math.random() * anuncios.length)];

        canal.send(anuncio);

    }, 5000);

    return "📢 Anúncios ativados!";
}

export function desativar() {

    if (!intervalo) {
        return "Os anúncios já estão desativados!";
    }

    clearInterval(intervalo);
    intervalo = null;

    return "Anúncios desativados!";
}