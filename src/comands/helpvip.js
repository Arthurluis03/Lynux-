export default {
    name: "help",

    execute(message) {

        message.reply(`
 # Lynux — Comandos VIP

!vipAtivar
Ativa seu VIP e cria seu cargo exclusivo de call.

!vip @usuario
Adiciona o cargo VIP ao usuário mencionado.

!removevip @usuario
Remove o cargo VIP do usuário mencionado.

!hvip
Mostra esta lista de comandos VIP.

SISTEMA DE CALL

Após usar !vipAtivar, seu cargo de call será criado automaticamente.

O cargo será baseado no seu nome.
Exemplo:
Arthur, a batata call

O sistema de VIP permite administrar sua própria call conforme as permissões configuradas.

Se precisar de ajuda com o sistema VIP, vá até o canal <#1537098266657951874>.
        `);
    }
};