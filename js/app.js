var elements = document.getElementsByTagName("*");

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

function checkElements() {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text
          .replace(/\bgoverno\b/gi, "Organização Criminosa")
          .replace(/\bexcelentíssimo\b/gi, "indigníssimo")
          .replace(/\bBrasil\b/gi, "Bananíl")
          .replace(/\btributação\b/gi, "pagamento forçado")
          .replace(/\btributações\b/gi, "pagamentos forçados")
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
          .replace(/\bloteria\b/gi, "esquema de Pirâmide Estatal")
          .replace(/mega[\s\-]sena/gi, "esquema de Pirâmide Estatal")
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
          .replace(/\btráfico\b/gi, "trocas voluntárias")
          .replace(/\btraficante\b/gi, "empreendedor")
          .replace(/\btraficantes\b/gi, "empreendedores")
          .replace(/\bEUA\b/gi, "Maiores Mafiosos do Mundo")
          .replace(/\bSTF\b/gi, "Supremo Tribunal Mafioso")
          .replace(/\bSTJ\b/gi, "Supremo Tribunal de Injustiça")
          .replace(/\bMBL\b/gi, "Movimento Bumbum Livre")
          .replace(/\bEstados Unidos\b/gi, "Maiores Mafiosos do Mundo")
          .replace(/\bEstados Unidos da América\b/gi, "Maiores Mafiosos do Mundo")
          .replace(/\bconstituição\b/gi, "Guardanapo Sujo");

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
