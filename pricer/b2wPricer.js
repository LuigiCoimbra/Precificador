import getPrecif from '../services/getPrecif.js'

//console.log(getSession)
console.log(getPrecif)

//await getSession()
const productB2W = await getPrecif()
var arrB2W = new Array(2)
var arrMargB2W = new Array(2)
var a = 0
var b = 0
var c = 0
var d = 0
var e = 0
var f = 0
var g = 0
var h = 0

var i = 0
var s = 0
const b2wPricer = function () {
  //console.log(productB2W)
  for (const prodInfo of productB2W) {
    const sequencia = prodInfo[0]
    const codProd = prodInfo[1]
    const comissao = parseFloat(prodInfo[3]) / 100
    const promocao = parseFloat(prodInfo[4]) / 100
    const reembolso = parseFloat(prodInfo[5]) / 100
    const custo = parseFloat(prodInfo[6])
    const mediaFrete = parseFloat(prodInfo[7])
    var perImp = prodInfo[8] != null ? parseFloat(prodInfo[8]) / 100 : 0
    const mediaMargem = prodInfo[9]
    const precoDe = parseFloat(prodInfo[11])
    const precoPor = parseFloat(prodInfo[14])
    var precoAtt = parseFloat(prodInfo[15])
    var precoAnt = parseFloat(prodInfo[15])
    const codTab = prodInfo[16]
    const nuTab = prodInfo[17]

    var precoFrete = precoDe + mediaFrete
    var valorImposto = precoFrete * perImp
    var valorReembolso = precoDe * reembolso
    var valorComissao = precoFrete * comissao
    var valorMargem =
      precoDe - (custo + valorImposto + valorComissao - valorReembolso)
    var margem = (valorMargem / precoFrete) * 100
    /*console.log(
      'Preco Atual: R$' + precoAtt.toFixed(2) + ' | ',
      'Custo: R$' + custo.toFixed(2) + ' | ',
      'Preco: R$' + precoDe.toFixed(2) + ' | ',
      'Preco+Frete: R$' + precoFrete + ' | ',
      'Valor Imposto: R$' + valorImposto + ' | ',
      'Valor Reembolso: R$' + valorReembolso + ' | ',
      'Valor Comissao: R$' + valorComissao.toFixed(2) + ' | ',
      'Valor Margem: R$' + valorMargem.toFixed(2) + ' | ',
      'Margem: ' + margem.toFixed(2) + ' | '
    )*/
    if (margem > mediaMargem) {
      precoAtt = precoDe - 3.0
      //console.log(precoAtt)

      i++
      arrB2W[i] = new Array(1)
      for (a = 0; a < 1; a++) {
        for (b = 0; b < 2; b++) {
          for (c = 0; c < 3; c++) {
            for (d = 0; d < 4; d++) {
              for (e = 0; e < 5; e++) {
                for (f = 0; f < 6; f++) {
                  arrB2W[i][a] = [i]
                  arrB2W[i][b] = [codTab]
                  arrB2W[i][c] = [codProd]
                  arrB2W[i][d] = [precoAtt]
                  arrB2W[i][e] = [precoAnt]
                  arrB2W[i][f] = [nuTab]
                }
              }
            }
          }
        }
      }
    }
    s++
    arrMargB2W[s] = new Array(1)
    for (g = 0; g < 1; g++) {
      for (h = 0; h < 2; h++) {
        arrMargB2W[s][g] = [sequencia]
        arrMargB2W[s][h] = [parseFloat(margem.toFixed(2))]
      }
    }
    //console.log(arrMargB2W)
  }
  return [arrB2W, arrMargB2W]
}

//b2wPricer()
export default b2wPricer
