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
          .replace("Governo", "Máfia")
          .replace("governo", "máfia")
          .replace("Brasil", "Bananíl")
          .replace("Prefeitura", "Casa da Máfia")
          .replace("prefeitura", "casa da Máfia")
          .replace("regulamentação", "lei do mais forte")
          .replace("Regulamentação", "Lei do mais forte")
          .replace("Política", "Bandidagem")
          .replace("Bolsonaro", "Chefe da Máfia")
          .replace("Presidente", "Chefe da Máfia")
          .replace("Previdência", "Pirâmide Estatal")
          .replace("Manifestantes", "Gadosos Bovinos")
          .replace("manifestantes", "gadosos bovinos")
          .replace("Contribuintes", "gadosos bovinos")
          .replace("contribuintes", "gadosos bovinos")
          .replace("PSL", "PT da Direita")
          .replace("constituição", "guardanapo sujo");

        if (replacedText !== text) {
          element.replaceChild(document.createTextNode(replacedText), node);
        }
      }
    }
  }
}
