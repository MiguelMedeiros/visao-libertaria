var elements = document.getElementsByTagName("*");

// base de um regex para capturar um artigo, com contrações de preposições ou plural
const regexForWordAndArticle = "(?:({1} )|({2} )|({3} ))?({0})"
  .replace("{1}", "\\b(?:un|uma|à|ao)s?") // casos irregulares
  .replace("{2}", "\\b(?:dess|dest|nest|d?aquel|naquel)[ea]s?") // casos de contrações com fim a/e
  .replace("{3}", "\\b(?:d|bn|pr|pel|)[oa]s?") // casos de contrações com fim a/o

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

function changeWordAndConjugate(match, p1, p2, p3, word) {
  let before = "";

  // p1 pega palavras irregulares
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
    before = p1;
  }

  // p2 pega palavras com fim e/a
  if (p2) {
    p2 = p2.toLowerCase();
    if (p2.endsWith("a ") || p2.endsWith("as ")) {
      p2 = p2.replace("a ", "e ");
      p2 = p2.replace("as ", "es ");
    } else {
      p2 = p2.replace("e ", "a ");
      p2 = p2.replace("es ", "as ");
    }
    before = p2;
  }

  // p3 pega palavras com fim o/a
  //
  if (p3) {
    p3 = p3.toLowerCase();
    if (p3.endsWith("a ") || p3.endsWith("as ")) {
      p3 = p3.replace("a ", "o ");
      p3 = p3.replace("as ", "os ");
    }  else {
      p3 = p3.replace("o ", "a ");
      p3 = p3.replace("os ", "as ");
    }
    before = p3;
  }
  // os termos estão aqui porque as substituições não podem ser passadas via argumento
  word = word.toLowerCase();
  if (word === "governo") {
    word = "Organização Criminosa";
  } else if (word === "tributação") {
    word = "pagamento forçado";
  } else if (word === "tributações") {
    word = "pagamentos forçados";
  } else if(word === "loteria") {
    word = "esquema de Pirâmide Estatal";
  } else if (word === "mega-sena") {
    word = "esquema de Pirâmide Estatal"
  } else if (word === "constituição") {
    word = "Guardanapo Sujo";
  } else {
    throw `Nada para substituir o termo ${word}`;
  }
  return `${before}${word}`
};

function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)]
}

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
          .replace(/\bpresidente\b/gi, getRandomWord([
              "Chefe da Máfia",
              "Il capo di tutti capi",
              "Líder da Milícia"
          ]))
          .replace("Bolsonaro", "Líder Supremo " + getRandomWord([
            "da Máfia",
            "da Milícia",
            "da Gangue"
          ]))
          .replace("Lula", "Presidiário de 9 Dedos")
          .replace("Maia", "Bolinha")
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
          .replace(/\bSTF\b/gi, "Supremo Tribunal Parasitário")
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
