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
          .replace(/Brasil/gi, "Bananíl")
          .replace(/imposto/gi, "roubo")
          .replace(/dinheiro/gi, "papelzinho colorido")
          .replace(/dolar/gi, "papelzinho colorido")
          .replace(/dolares/gi, "papelzinhos coloridos")
          .replace(/prefeitura/gi, "Casa da Máfia")
          .replace(/regulamentação/gi, "lei do mais forte")
          .replace(/Política/gi, "Bandidagem")
          .replace(/Presidente Bolsonaro/gi, "Chefe da Máfia")
          .replace("Bolsonaro", "Chefe da Máfia")
          .replace("Lula", "Presidiário de 9 Dedos")
          .replace("Maia", "Bolinha")
          .replace(/presidente/gi, "Chefe da Máfia")
          .replace(/previdência/gi, "Pirâmide Estatal")
          .replace(/loteria/gi, "esquema de Pirâmide Estatal")
          .replace(/manifestantes/gi, "gadosos bovinos")
          .replace(/contribuintes/gi, "gadosos bovinos")
          .replace(/policia/gi, "milícia da Máfia")
          .replace(/policias/gi, "milícias da Máfia")
          .replace(/policial/gi, "milíciano da Máfia")
          .replace(/policiais/gi, "milícianos da Máfia")
          .replace(/PMs/gi, "milícianos da Máfia")
          .replace(/PSL/gi, "PT da Direita")
          .replace(/governador/gi, "Xerife da Máfia")
          .replace(/Alerj/gi, "Casa dos bandidos")
          .replace(/Alesp/gi, "Casa dos bandidos")
          .replace(/tráfico/gi, "trocas voluntárias")
          .replace(/traficante/gi, "empreendedor")
          .replace(/traficantes/gi, "empreendedores")
          .replace(/EUA/gi, "Maiores Mafiosos de Mundo")
          .replace(/STF/gi, "Supremo Tribunal Mafioso")
          .replace(/Estados Unidos/gi, "Maiores Mafiosos de Mundo")
          .replace(/Estados Unidos da América/gi, "Maiores Mafiosos de Mundo")
          .replace(/constituição/gi, "Guardanapo Sujo");

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
