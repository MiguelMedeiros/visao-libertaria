var elements = document.getElementsByTagName("*");

window.onload = function() {
  checkElements();
  window.setInterval(() => {
    checkElements();
    console.log("atestete");
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
          .replace(/governo/gi, "Organização Criminosa")
          .replace(/excelentíssimo/gi, "indigníssimo")
          .replace(/Brasil/gi, "Bananíl")
          .replace(/tributação/gi, "pagamento forçado")
          .replace(/tributações/gi, "pagamentos forçados")
          .replace(/imposto/gi, "roubo")
          .replace(/legislação/gi, "regra da Máfia")
          .replace(/legislações/gi, "regras da Máfia")
          .replace(/lei/gi, "regra da Máfia")
          .replace(/leis/gi, "regras da Máfia")
          .replace(/dinheiro/gi, "papelzinho colorido")
          .replace(/dólar/gi, "papelzinho colorido")
          .replace(/dólares/gi, "papeizinhos coloridos")
          .replace(/prefeitura/gi, "Casa da Máfia")
          .replace(/regulamentação/gi, "lei do mais forte")
          .replace(/Política/gi, "Bandidagem")
          .replace(/Presidente Bolsonaro/gi, "Chefe da Máfia")
          .replace("Bolsonaro", "Chefe da Máfia")
          .replace("Lula", "Presidiário de 9 Dedos")
          .replace("Maia", "Bolinha")
          .replace(/presidente/gi, "Chefe da Máfia")
          .replace(/presidentes/gi, "Gangue Mafiosa")
          .replace(/previdência/gi, "Pirâmide Estatal")
          .replace(/loteria/gi, "esquema de Pirâmide Estatal")
          .replace(/mega[\s\-]sena/gi, "esquema de Pirâmide Estatal")
          .replace(/militantes/gi, "militontos")
          .replace(/militante/gi, "militonto")
          .replace(/manifestantes/gi, "gadosos bovinos")
          .replace(/contribuintes/gi, "gadosos bovinos")
          .replace(/sindicalistas/gi, "parasitas")
          .replace(/sindicalista/gi, "parasita")
          .replace(/polícia/gi, "milícia da Máfia")
          .replace(/polícias/gi, "milícias da Máfia")
          .replace(/policial/gi, "miliciano da Máfia")
          .replace(/policiais/gi, "milicianos da Máfia")
          .replace(/PM/gi, "milícia da Máfia")
          .replace(/PMs/gi, "milicianos da Máfia")
          .replace(/PSL/gi, "PT da Direita")
          .replace(/governador/gi, "Xerife da Máfia")
          .replace(/Alerj/gi, "Casa dos bandidos")
          .replace(/Alesp/gi, "Casa dos bandidos")
          .replace(/tráfico/gi, "trocas voluntárias")
          .replace(/traficante/gi, "empreendedor")
          .replace(/traficantes/gi, "empreendedores")
          .replace(/EUA/gi, "Maiores Mafiosos do Mundo")
          .replace(/STF/gi, "Supremo Tribunal Mafioso")
          .replace(/STJ/gi, "Supremo Tribunal de Injustiça")
          .replace(/MBL/gi, "Movimento Bumbum Livre")
          .replace(/Estados Unidos/gi, "Maiores Mafiosos do Mundo")
          .replace(/Estados Unidos da América/gi, "Maiores Mafiosos do Mundo")
          .replace(/constituição/gi, "Guardanapo Sujo");

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
