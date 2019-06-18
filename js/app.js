var elements = document.getElementsByTagName("*");

// base de um regex para capturar um artigo, com contrações de preposições ou plural
const regexForWordAndArticle = "((?:\bun|\buma?|(?:\bd|\bn|\bpr|\bpel|\b|)[oa]|à)s? )?({0})";

window.onload = function() {
  checkElements();
  window.setInterval(() => {
    checkElements();
  }, 3000);
};

document.addEventListener(
  "click",
  function(event) {
    checkElements();
  },
  false
);

function makeRegexWithArticle(word) {
  return new RegExp(regexForWordAndArticle.replace("{0}", word), "gi");
};

function changeWordAndConjugate(match, p1, p2) {
  if (p1 === undefined || p1 === null) {
    // necessário para não concatenar 'undefined'
    p1 = "";
  }  else {
    // operações de inversão de gênero
    if (p1 == "umas") {
      p1 = "uns";
    } else if (p1 == "uns") {
      p1 = "umas";
    }
    if (p1 == "uma") {
      p1 = "um";
    } else if (p1 === "um") {
      p1 = "uma";
    }
    if (p1.search("a") != -1) {
      p1 = p1.replace("a", "o");
    } else {
      p1 = p1.replace("o", "a");
    }
    if (p1.search("à") != -1) {
      p1 = p1.replace("à", "ao")
    }
  }

  // as substituições não podem ser passadas via argumento
  if (p2 == "governo") {
    p2 = "Organização Criminosa";
  } else if (p2 == "tributação") {
    p2 = "pagamento forçado";
  } else if (p2 == "tributações") {
    p2 = "pagamentos forçados";
  } else if(p2 == "loteria") {
    p2 = "esquema de Pirâmide Estatal";
  } else if (p2 == "mega-sena") {
    p2 = "esquema de Pirâmide Estatal"
  } else if("constituição") {
    p2 = "Guardanapo Sujo";
  } else {
    throw `Nada para substituir o termo ${match}`;
  }
  return `${p1}${p2}`
};

function checkElements() {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text
          .replace(makeRegexWithArticle("governo"), changeWordAndConjugate)
          .replace(/\bexcelentíssimo\b/gi, "indigníssimo")
          .replace(/\bBrasil\b/gi, "Bananíl")
          .replace(makeRegexWithArticle("tributação"), changeWordAndConjugate)
          .replace(makeRegexWithArticle("tributações"), changeWordAndConjugate)
          .replace(/\bimposto\b/gi, "roubo")
          .replace(/\blegislação\b/gi, "regra da Máfia")
          .replace(/\blegislações\b/gi, "regras da Máfia")
          .replace(/\blei\b/gi, "regra da Máfia")
          .replace(/\bleis\b/gi, "regras da Máfia")
          .replace(/\bdinheiro\b/gi, "papelzinho colorido")
          .replace(/\bdólar\b/gi, "papelzinho colorido")
          .replace(/\bdólares\b/gi, "papeizinhos coloridos")
          .replace(/\bprefeitura\b/gi, "Casa da Máfia")
          .replace(/\bregulamentação\b/gi, "lei do mais forte")
          .replace(/\bPolítica\b/gi, "Bandidagem")
          .replace(/\bPresidente Bolsonaro\b/gi, "Chefe da Máfia")
          .replace("Bolsonaro", "Chefe da Máfia")
          .replace("Lula", "Presidiário de 9 Dedos")
          .replace("Maia", "Bolinha")
          .replace(/\bpresidente\b/gi, "Chefe da Máfia")
          .replace(/\bpresidentes\b/gi, "Gangue Mafiosa")
          .replace(/\bprevidência\b/gi, "Pirâmide Estatal")
          .replace(makeRegexWithArticle("loteria"), changeWordAndConjugate)
          .replace(makeRegexWithArticle("mega-sena"), changeWordAndConjugate)
          .replace(/\bmilitantes\b/gi, "militontos")
          .replace(/\bmilitante\b/gi, "militonto")
          .replace(/\bmanifestantes\b/gi, "gadosos bovinos")
          .replace(/\bcontribuintes\b/gi, "gadosos bovinos")
          .replace(/\bsindicalistas\b/gi, "parasitas")
          .replace(/\bsindicalista\b/gi, "parasita")
          .replace(/\bpolícia\b/gi, "milícia da Máfia")
          .replace(/\bpolícias\b/gi, "milícias da Máfia")
          .replace(/\bpolicial\b/gi, "miliciano da Máfia")
          .replace(/\bpoliciais\b/gi, "milicianos da Máfia")
          .replace(/\bPM\b/gi, "milícia da Máfia")
          .replace(/\bPMs\b/gi, "milicianos da Máfia")
          .replace(/\bPSL\b/gi, "PT da Direita")
          .replace(/\bgovernador\b/gi, "Xerife da Máfia")
          .replace(/\bAlerj\b/gi, "Casa dos bandidos")
          .replace(/\bAlesp\b/gi, "Casa dos bandidos")
          .replace(/\btráfico\b/gi, "s trocas voluntárias")
          .replace(/\btraficante\b/gi, "empreendedor")
          .replace(/\btraficantes\b/gi, "empreendedores")
          .replace(/\bEUA\b/gi, "Maiores Mafiosos do Mundo")
          .replace(/\bSTF\b/gi, "Supremo Tribunal Mafioso")
          .replace(/\bSTJ\b/gi, "Supremo Tribunal de Injustiça")
          .replace(/\bMBL\b/gi, "Movimento Bumbum Livre")
          .replace(/\bEstados Unidos\b/gi, "Maiores Mafiosos do Mundo")
          .replace(/\bEstados Unidos da América\b/gi, "Maiores Mafiosos do Mundo")
          .replace(makeRegexWithArticle("constituição"), changeWordAndConjugate);

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
