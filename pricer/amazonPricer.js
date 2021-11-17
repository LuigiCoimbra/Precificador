import getAmazon from '../services/getAmazon.js'
//import savePriceAmz from './services/savePriceAmz.js'

//console.log(getSession)
console.log(getAmazon)

//await getSession()
const getAmazonInfo = await getAmazon()
//const savePriceInfo = await savePriceAmz()
var arrMarg = new Array(2)
var arrProd = new Array(2)
var s = 0
var i = 0
var a = 0
var b = 0
var c = 0
var d = 0
var e = 0
var f = 0
var g = 0
var h = 0

//console.log('teste1')
const amzCount = function () {
  //console.log('teste2')
  for (const amzInfo of getAmazonInfo) {
    var id = amzInfo[0]
    const preco = parseFloat(amzInfo[11])
    const loja = amzInfo[13]
    const place = amzInfo[12]
    const codProd = parseInt(amzInfo[1])
    const nuTab = parseInt(amzInfo[17])
    const codTab = amzInfo[16]
    var precoAtt = parseFloat(amzInfo[15])
    var precoAnt = parseFloat(amzInfo[15])
    //console.log('teste3')
    const comissao = parseFloat(amzInfo[3]) / 100
    const promocao = parseFloat(amzInfo[4]) / 100
    const reembolso = parseFloat(amzInfo[5]) / 100
    const custo = parseFloat(amzInfo[6])
    const mediaFrete = parseFloat(amzInfo[7])
    var perImp = amzInfo[8] != null ? parseFloat(amzInfo[8]) / 100 : 0
    const mediaMargem = amzInfo[9]
    //console.log(mediaMargem)

    var precoFrete = preco + mediaFrete
    var valorImposto = precoFrete * perImp
    var valorReembolso = preco * reembolso
    var valorComissao = precoFrete * comissao
    var valorMargem =
      preco - (custo + valorImposto + valorComissao - valorReembolso)
    var margem = (valorMargem / precoFrete) * 100
    //console.log('Preco Atual: R$' + precoAtt.toFixed(2) + ' | ','Custo: R$' + custo.toFixed(2) + ' | ','Preco: R$' + preco.toFixed(2) + ' | ','Preco+Frete: R$' + precoFrete + ' | ','Valor Imposto: R$' + valorImposto + ' | ','Valor Reembolso: R$' + valorReembolso + ' | ','Valor Comissao: R$' + valorComissao.toFixed(2) + ' | ','Valor Margem: R$' + valorMargem.toFixed(2) + ' | ','Margem: ' + margem.toFixed(2) + ' | ')
    //console.log(codProd)

    if (margem > mediaMargem) {
      let precoAtt = preco - 3.0
      //var arrProd = new Array(codTab, codProd, precoAtt, preco, nuTab)
      //return (arrProd)

      i++
      var v = [codTab, codProd, precoAtt, preco, nuTab]
      arrProd[i] = new Array(1)
      for (a = 0; a < 1; a++) {
        for (b = 0; b < 2; b++) {
          for (c = 0; c < 3; c++) {
            for (d = 0; d < 4; d++) {
              for (e = 0; e < 5; e++) {
                for (f = 0; f < 6; f++) {
                  arrProd[i][a] = [i]
                  arrProd[i][b] = [codTab]
                  arrProd[i][c] = [codProd]
                  arrProd[i][d] = [precoAtt]
                  arrProd[i][e] = [precoAnt]
                  arrProd[i][f] = [nuTab]
                }
              }
            }
          }
        }
      }

      //console.log(arrProd)
    }

    //console.log (id,margem)
    //return ([id , margem, arrProd])

    //var arrProd = [codTab, codProd, precoAtt, preco, nuTab]

    s++
    arrMarg[s] = new Array(1)
    for (g = 0; g < 1; g++) {
      for (h = 0; h < 2; h++) {
        arrMarg[s][g] = id
        arrMarg[s][h] = margem
      }
    }
    //console.log(arrProd)
  }

  //console.log(arrProd)
  //const arrProd = [codTab, productId, precoAtt, preco, nuTab]
  //return (arrProd)
  //console.log (id,margem)
  return [arrMarg, arrProd]
  //return (margem)
  //console.log (arrProd)
}

//amzCount()
export default amzCount
//console.log(amzCount([]))
