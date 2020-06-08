const rootElement = document.getElementsByTagName("BODY")[0];
var isNotWhitelisted;

// base de um regex para capturar um artigo, com contrações de preposições ou plural
const regexPrecedingArticleAndWord = "(?:({1}) |({2}) |({3}) )?({0})"
  .replace("{1}", "\\b(?:un|uma|à|ao)s?") // casos irregulares
  .replace("{2}", "\\b(?:dess|dest|nest|d?aquel|naquel)[ea]s?") // casos de contrações com fim a/e
  .replace("{3}", "\\b(?:d|n|pr|pel|)[oa]s?"); // casos de contrações com fim a/o

/**
 * confere se a extensão pode processar a página da aba atual, ou não
 * @return {boolean} retorna true se o site pode ser modificado, e false caso contrário.
 */
function checkURL() {
  chrome.runtime.sendMessage({ command: "check-current-url" }, response => {
    isNotWhitelisted = response.isURLEnabled;
  });
}

checkURL();
window.onload = function() {
  if (isNotWhitelisted) {
    checkElements(null, rootElement);
    window.setInterval(() => {
      checkElements(null, rootElement);
    }, 3000);
    document.addEventListener(
      "click",
      () => {
        checkElements(null, rootElement);
      },
      false
    );
  }
};

/**
 * constrói uma regex que captura a palavra fornecida e a anterior, se for um artigo
 * @param {String} word a palavra a ser inserida no regex
 * @return {RegExp} a regex construída com a palavra fornecida
 *
 */
function capturePreviousWord(word) {
  return new RegExp(regexPrecedingArticleAndWord.replace("{0}", word), "gi");
}

/**
 * Função para substituir palavras quando o gênero é alterado
 * @param {String} match o match completo da regex
 * @param {String|null} p1 contrações de preposição + artigo irregulares
 * @param {String|null} p2 alguma preposição + artigo com fim a/e
 * @param {String|null} p3 alguma preposição + artigo com fim a/o
 * @param {String} word a palavra a ser substituída
 */
function customReplacer(match, p1, p2, p3, word) {
  let particle = "";

  if (p1) {
    p1 = p1.toLowerCase();

    if (p1 == "umas") {
      p1 = "uns";
    } else if (p1 == "uns") {
      p1 = "umas";
    }

    if (p1 == "uma") {
      p1 = "um";
    } else if (p1 == "um") {
      p1 = "uma";
    }

    if (p1.search("à") != -1) {
      p1 = p1.replace("à", "ao");
    } else if (p1.search("ao") != -1) {
      p1 = p1.replace("ao", "à");
    }

    particle = p1;
  }

  if (p2) {
    p2 = p2.toLowerCase();

    if (p2.endsWith("a") || p2.endsWith("as")) {
      p2 = p2.replace("a", "e");
      p2 = p2.replace("as", "es");
    } else {
      p2 = p2.replace("e", "a");
      p2 = p2.replace("es", "as");
    }

    particle = p2;
  }

  if (p3) {
    p3 = p3.toLowerCase();

    if (p3.endsWith("a") || p3.endsWith("as")) {
      p3 = p3.replace("a", "o");
      p3 = p3.replace("as", "os");
    } else {
      p3 = p3.replace("o", "a");
      p3 = p3.replace("os", "as");
    }

    particle = p3;
  }

  // os termos estão aqui porque as substituições não podem ser passadas via argumento
  word = word.toLowerCase();
  if (word === "governo") {
    word = "Organização Criminosa";
  } else if (word === "tributação") {
    word = "pagamento forçado";
  } else if (word === "tributações") {
    word = "pagamentos forçados";
  } else if (word === "loteria") {
    word = "Esquema de Pirâmide Estatal";
  } else if (word === "mega-sena") {
    word = "Esquema de Pirâmide Estatal";
  } else if (word === "constituição") {
    word = "Guardanapo Sujo";
  } else {
    throw `Nada para substituir o termo ${word}`;
  }

  // o espaço foi jogado fora no matching da Regex
  if (!particle == "") {
    particle = particle + " ";
  }

  return `${particle}${word}`;
}

function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function checkElements(parentNode, node) {
  let isTextbox = false;
  let isEditable = false;

  if (node && node.getAttribute) {
    // Informa se o node é um input no Facebook, Linkedin ou Twitter
    isTextbox = node.getAttribute("role") == "textbox";

    // Informa se o node é um input em sites como Messenger, Minds ou YouTube
    isEditable = node.getAttribute("contenteditable") == "true";
  }

  if (node && !isTextbox && !isEditable) {
    for (var i = 0; i < node.childNodes.length; i++) {
      checkElements(node, node.childNodes[i]);
    }

    if (node.nodeType === 3) {
      var text = node.nodeValue;
      var replacedText = text
        .replace(capturePreviousWord("governo"), customReplacer)
        .replace(/\bexcelentíssimo\b/gi,
		  getRandomWord([
            "indigníssimo",
            "excrementíssimo"
          ])
		)
        .replace(/\bBrasil\b/gi, "Bananíl")
        .replace(capturePreviousWord("tributação"), customReplacer)
        .replace(capturePreviousWord("tributações"), customReplacer)
        .replace(/\bimposto\b/gi, "roubo")
		.replace(/\bimpostos\b/gi, "roubos")
        .replace(/\blegislação\b/gi, "regra da Máfia")
        .replace(/\blegislações\b/gi, "regras da Máfia")
        .replace(/\blei\b/gi, "Regra da Máfia")
        .replace(/\bleis\b/gi, "regras da Máfia")
        .replace(/\bdinheiro\b/gi, "papelzinho colorido")
        .replace(/\bdólar\b/gi, "papelzinho colorido")
        .replace(/\bdólares\b/gi, "papeizinhos coloridos")
        .replace(/\bprefeitura\b/gi, "Casa da Máfia")
        .replace(/\bregulamentação\b/gi, "lei do mais forte")
        .replace(/\bPolítica\b/gi, "Bandidagem")
        .replace(
          /\bpresidente\b/gi,
          getRandomWord([
            "Chefe da Máfia",
            "Il capo di tutti capi",
            "Líder da Milícia"
          ])
        )
        .replace(
          "Bolsonaro",
          "Líder Supremo " +
            getRandomWord(["da Máfia", "da Milícia", "da Gangue"])
        )
        .replace("Lula", "Presidiário de 9 Dedos")
        .replace("Maia", "Bolinha")
        .replace(/\bpresidentes\b/gi, "Gangue Mafiosa")
        .replace(/\bprevidência\b/gi, "Pirâmide Estatal")
        .replace(capturePreviousWord("loteria"), customReplacer)
        .replace(capturePreviousWord("mega-sena"), customReplacer)
        .replace(/\bmilitante\b/gi, "militonto")
		.replace(/\bmilitantes\b/gi, "militontos")
        .replace(/\bmanifestantes\b/gi, "gadosos bovinos")
        .replace(/\bcontribuintes\b/gi, "gadosos bovinos")
        .replace(/\bsindicalista\b/gi, "parasita")
		.replace(/\bsindicalistas\b/gi, "parasitas")
		.replace(/\bSenador\b/gi, "Bandido")
		.replace(/\bSenadores\b/gi, "Bandidos")
		.replace(/\bDeputado\b/gi, "Ladrão")
		.replace(/\bDeputados\b/gi, "Ladrões")
		.replace(/\bVereador\b/gi, "Ladrão local")
		.replace(/\bVereadores\b/gi, "Ladrões locais")
        .replace(/\bpolícia\b/gi, "milícia da Máfia")
		.replace(/\bpolícias\b/gi, "milícias da Máfia")
        .replace(/\bpolicial\b/gi, "miliciano da Máfia")
        .replace(/\bpoliciais\b/gi, "milicianos da Máfia")
        .replace(/\bPM\b/gi, "milícia da Máfia")
        .replace(/\bPMs\b/gi, "milicianos da Máfia")
        .replace(/\bPSL\b/gi, "PT da Direita")
		.replace(/\bPartido Social Liberal\b/gi, "PT da Direita")
		.replace(/\bGCM\b/gi, "Milícia da Máfia Local")
		.replace(/\bGuarda Municipal\b/gi, "Milícia da Máfia Local")
		.replace(/\bGuardas Municipais\b/gi, "milícias das Máfias locais")
		.replace(/\bGuarda Civil Municipal\b/gi, "Milícia da Máfia Local")
		.replace(/\bGuardas Civis Municipais\b/gi, "milícias das Máfias locais")
		.replace(/\bGuarda Metropolitana\b/gi, "Milícia da Máfia Local")
		.replace(/\bGuardas Metropolitanas\b/gi, "milícias da Máfias locais")
		.replace(/\bGuarda Civil Metropolitana\b/gi, "Milícia da Máfia Local")
		.replace(/\bGuardas Civis Metropolitanas\b/gi, "milícias das Máfias locais")
		.replace(/\bForça Nacional de Segurança Pública\b/gi, "Força Miliciana da Máfia Nacional")
        .replace(/\bgovernador\b/gi, "Xerife da Máfia")
		.replace(/\bgovernadores\b/gi, "Xerifes da Máfia")
		.replace(/\bprefeito\b/gi, "Coronel da Máfia")
		.replace(/\bprefeitos\b/gi, "Coroneis da Máfia")
        .replace(/\bAlerj\b/gi, "Casa dos bandidos")
        .replace(/\bAlesp\b/gi, "Casa dos bandidos")
		.replace(/\bAssembleia Legislativa\b/gi, "Casa dos bandidos")
		.replace(/\bCâmara Municipal\b/gi, "Casa dos bandidos")
		.replace(/\bSenado\b/gi, "Casa dos bandidos")
        .replace(/\btráfico\b/gi, "s trocas voluntárias")
        .replace(/\btraficante\b/gi, "empreendedor")
        .replace(/\btraficantes\b/gi, "empreendedores")
        .replace(/\bEUA\b/gi, "Maiores Mafiosos do Mundo")
        .replace(/\bSTF\b/gi, "Supremo Tribunal Parasitário")
        .replace(/\bSTJ\b/gi, "Supremo Tribunal de Injustiça")
		.replace(/\bSTM\b/gi, "Supremo Tribunal Miliciano")
		.replace(/\bTSE\b/gi, "Tribunal Superior da Enganação")
		.replace(/\bTST\b/gi, "Tribunal Superior do Desemprego")
        .replace(/\bMBL\b/gi, "Movimento Bumbum Livre")
        .replace(/\bABIN\b/gi, "Associação de Bestas de Inteligência Nula")
        .replace(/\bOMS\b/gi, "Organização Multiplicadora de Suicídios")
        .replace(/\bEstados Unidos\b/gi, "Maiores Mafiosos do Mundo")
        .replace(/\bEstados Unidos da América\b/gi, "Maiores Mafiosos do Mundo")
		.replace(/\bSupremo Tribunal Federal\b/gi, "Supremo Tribunal Parasitário")
		.replace(/\bSupremo Tribunal de Justiça\b/gi, "Supremo Tribunal de Injustiça")
		.replace(/\bSupremo Tribunal Militar\b/gi, "Supremo Tribunal Miliciano")
		.replace(/\bTribunal Superior Eleitoral\b/gi, "Tribunal Superior da Enganação")
		.replace(/\bTribunal Superior Trabalhista\b/gi, "Tribunal Superior do Desemprego")
		.replace(/\bMovimento Brasil Livre\b/gi, "Movimento Bumbum Livre")
		.replace(/\bAgência Brasileira de Inteligência\b/gi, "Associação de Bestas de Inteligência Nula")
		.replace(/\bOrganização Mundial da Saúde\b/gi, "Organização Multiplicadora de Suicídios")
		.replace(/\bConselho Nacional de Justiça\b/gi, "Conselho Nacional de Injustiça")
		.replace(/\bOrdem Judicial\b/gi, "Ordem da Máfia")
		.replace(/\bMandado de Prisão\b/gi, "Mandado de Sequestro")
		.replace(/\bJuiz Federal\b/gi, "Inquisidor da Máfia")
		.replace(/\bJuizes Federais\b/gi, "Inquisidores da Máfia")
		.replace(/\bmagistrado\b/gi, "Inquisidor da Máfia")
		.replace(/\bmagistrados\b/gi, "Inquisidores da Máfia")
		.replace(/\bdesembargador\b/gi, "Inquisidor da Máfia")
		.replace(/\bdesembargadores\b/gi, "Inquisidores da Máfia")
		.replace(/\bMinistério Público\b/gi, "Orgão Inquisitorial")
		.replace(/\bPromotor de Justiça\b/gi, "Acusador da Inquisição Mafiosa")
		.replace(/\bPromotores de Justiça\b/gi, "Acusadores da Inquisição Mafiosa")
		.replace(/\bColégio Público\b/gi, "Centro de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\bColégio Estadual\b/gi, "Centro de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\bEscola Pública\b/gi, "Organização de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\bFaculdade Pública\b/gi, "Organização de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\bUniversidade Pública\b/gi, "Organização de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\bUniversidade Estadual\b/gi, "Organização Estadual de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\bUniversidade Federal\b/gi, "Organização Federal de " +
		  getRandomWord(["Doutrinação","Alienação"]) +
		  " do Gado")
		.replace(/\beducação pública\b/gi, "alienação pública")
		.replace(/\bNações Unidas\b/gi, "Máfias Unidas")
		.replace(/\bmulta ambiental\b/gi, "extorsão ambiental")
		.replace(/\bserviço militar obrigatório\b/gi, "escravidão obrigatória")
		.replace(/\bSistema Único de Saúde\b/gi, "Seu Último Suspiro")
		.replace(/\bConcurso Público\b/gi, "Recrutamento da Máfia")
	    .replace(/\bConcursos Públicos\b/gi, "Recrutamentos da Máfia")
		.replace(/\bProcesso Judicial\b/gi, "Processo Inquisitorial")
		.replace(/\bsonegação fiscal\b/gi, "legítima defesa")
		.replace(/\bPoder Público\b/gi, "Poder Mafioso")
		.replace(/\bAdministração Pública\b/gi, "Administração Mafiosa")
		.replace(/\bmercadoria apreendida\b/gi, "mercadoria roubada")
		.replace(/\bmercadorias apreendidas\b/gi, "mercadorias roubadas")
		.replace(/\bproduto apreendido\b/gi, "produto roubado")
		.replace(/\bobjeto apreendido\b/gi, "objeto roubado")
		.replace(/\bJustiça do Trabalho\b/gi, "Justiça do Desemprego")
		.replace(/\bJustiça Militar\b/gi, "Justiça Miliciana")
		.replace(/\bJustiça Eleitoral\b/gi, "Justiça da Enganação")
		.replace(/\bServiço Público\b/gi, "Parasitismo Estatal")
		.replace(/\bServiços Públicos\b/gi, "Parasitismos Estatais")
		.replace(/\bServidor Público\b/gi, "Parasita Estatal")
		.replace(/\bServidores Públicos\b/gi, "Parasitas Estatais")
		.replace(/\bFuncionário Público\b/gi, "Parasita Estatal")
		.replace(/\bFuncionários Públicos\b/gi, "Parasitas Estatais")
		.replace(/\bReceita Federal\b/gi, "Divisão de Roubos da Máfia")
		.replace(/\bPresidência da República\b/gi, "Chefia da Máfia")
		.replace(/\bPalácio da Alvorada\b/gi, "Palácio da Máfia")
		.replace(/\bForças Armadas\b/gi, "Milícias Mafiosas Armadas")
		.replace(/\bExército Brasileiro\b/gi, "Braço Armado da Máfia")
		.replace(/\bForça Aérea Brasileira\b/gi, "Força Aérea da Biqueira")
        .replace(capturePreviousWord("constituição"), customReplacer);

      if (replacedText !== text) {
        parentNode.replaceChild(document.createTextNode(replacedText), node);
      }
    }
  }
}