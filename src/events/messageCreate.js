import fs from "node:fs";
import path from "node:path";

import topmsg from "../comands/topmsg.js";
import { ativar, desativar } from "./anuncio.js";

import removermsg from "../comands/removermsg.js";
import msgremover from "../comands/msgremover.js";

import vip from "../comands/vip.js";
import Ativarvip from "../comands/Ativarvip.js";
import removevip from "../comands/removeVip.js";

import help from "../comands/help.js";
import helpvip from "../comands/helpvip.js";

import top from "../comands/top.js";

import setVIP from "../comands/setVIP.js";
import setInfinite from "../comands/setInfinite.js";
import setRoyal from "../comands/setRoyal.js";
import setPartner from "../comands/setPartner.js";
import setPotato from "../comands/setPotato.js";
import hset from "../comands/hset.js";
import vipColor from "../comands/vipColor.js";
import vipName from "../comands/vipName.js";
import vipCall from "../comands/vipCall.js";

import resetvip from "../comands/resetVip.js";

const caminhoWelcome = path.resolve("src/data/welcomeData.json");

const caminhoMessages = path.resolve("src/data/messageData.json");

const ID_CANAL_MSG = "1537095362710478918";

function Comando_Prefixo(texto) {
  const prefixos = ["!", "/", "+", "$", "#", "%", "&", "*"];

  return prefixos.some((prefixo) => texto.trim().startsWith(prefixo));
}

function Dados_Carregar(caminho) {
  return JSON.parse(fs.readFileSync(caminho, "utf8"));
}

function Dados_Salvar(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 4));
}

function BoasVindas_Padrao(texto) {
  const mensagem = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const padrao = /\b(?:seja\s+)?bem[-\s]+vind[oa](?:\(a\))?\b/i;

  return padrao.test(mensagem);
}

export default (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const userId = message.author.id;

    // CONTADOR DE MENSAGENS

    if (
      message.channel.id === ID_CANAL_MSG &&
      !Comando_Prefixo(message.content)
    ) {
      const messageDados = Dados_Carregar(caminhoMessages);

      if (!messageDados[userId]) {
        messageDados[userId] = 0;
      }

      messageDados[userId] += 1;

      Dados_Salvar(caminhoMessages, messageDados);
    }

    // CONTADOR DE BOAS-VINDAS

    if (BoasVindas_Padrao(message.content)) {
      const welcomeDados = Dados_Carregar(caminhoWelcome);

      if (!welcomeDados[userId]) {
        welcomeDados[userId] = 0;
      }

      welcomeDados[userId] += 1;

      Dados_Salvar(caminhoWelcome, welcomeDados);
    }

    // PING

    if (message.content === "!ping") {
      message.reply("Pong!");
    }

    // ANÚNCIOS

    if (message.content === "!anuncio ativar") {
      const resposta = ativar(client);

      message.reply(resposta);
    }

    if (message.content === "!anuncio desativar") {
      const resposta = desativar();

      message.reply(resposta);
    }

    // VIP

    if (message.content.startsWith("!vip ")) {
      vip.execute(message);
    }

    if (message.content === "!vipAtivar") {
      Ativarvip.execute(message);
    }

    if (message.content.startsWith("!removevip ")) {
      removevip.execute(message);
    }

    if (message.content.startsWith("!setVIP ")) {
      setVIP.execute(message);
    }

    if (message.content.startsWith("!vipColor ")) {
      vipColor.execute(message);
    }

    if (message.content.startsWith("!vipName ")) {
      vipName.execute(message);
    }

    if (message.content.startsWith("!vipCall ")) {
      vipCall.execute(message);
    }

    if (message.content.startsWith("!resetvip ")) {
      resetvip.execute(message);
    }

    // CARGOS

    if (message.content.startsWith("!setInfinite ")) {
      setInfinite.execute(message);
    }

    if (message.content.startsWith("!setRoyal")) {
      setRoyal.execute(message);
    }

    if (message.content.startsWith("!setPartner")) {
      setPartner.execute(message);
    }

    if (message.content.startsWith("!setPotato ")) {
      setPotato.execute(message);
    }

    // HELP

    if (message.content === "!help") {
      help.execute(message);
    }

    if (message.content === "!hset") {
      hset.execute(message);
    }
    if (message.content === "!hvip") {
      helpvip.execute(message);
    }

    // TOP BOAS-VINDAS

    if (message.content === "!top") {
      top.execute(message);
    }

    // TOP MENSAGENS

    if (message.content === "!topmsg") {
      topmsg.execute(message);
    }

    // PURGE

    if (message.content === "!purge" || message.content.startsWith("!purge ")) {
      removermsg.execute(message);
    }

    // REMOVER PONTOS DO TOPMSG

    if (message.content.startsWith("!msgremover ")) {
      msgremover.execute(message);
    }
  });
};
