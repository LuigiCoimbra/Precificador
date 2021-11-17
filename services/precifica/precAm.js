import getSession from '../getSession.js'
import authentication from './precAuth.js'
import precificaApiHelper from '../../helpers/precificaApiHelper.js'
import getB2W from '../getB2W.js'

await getSession()
const getCodProd = await getB2W()
export default async function getAmericanas () {
  var arrPrecif = new Array(2)
  var a = 0
  var i = 0
  var b = 0
  var c = 0
  var d = 0
  var e = 0
  var f = 0
  for (a = 0;a < getCodProd.length; a++){
    //console.log(getCodProd[a][0])
    const codProd = getCodProd[a][0]
    
    try {
      await authentication()
      const dt = await precificaApiHelper.get('/platform/marketplace/www.americanas.com.br/scan/last/' + codProd)
      var precoBruto = 0
      var precoPromocao = 0
      var dominio = 'Produto nao cadastrado'
      var ganhador = 'Produto nao cadastrado'
      const prodInfo = dt.data.data[0].last_scan.data[0]
      var sku = parseInt(dt.data.data[0].reference_code)
      //if(dt.data.success == 1){
      precoBruto = prodInfo.price
      precoPromocao = prodInfo.offer_price
      dominio = prodInfo.domain
      ganhador = prodInfo.sold_by
      //}
      //console.log(prodInfo)
      //return(precoBruto , precoPromocao, dominio, ganhador)
    } catch (err) {
      //console.log('ERROR ----', err)
      var sku = codProd
      var precoBruto = 0
      var precoPromocao = 0
      var dominio = 'Produto nao cadastrado'
      var ganhador = 'Produto nao cadastrado'
      //return([sku,precoBruto , precoPromocao, dominio, ganhador])
    }
    
    //console.log(sku,precoBruto , precoPromocao, dominio, ganhador)
    i++
    arrPrecif[i] = new Array(1)
    for (b = 0; b < 1; b++){
      for (c = 0; c < 2; c++){
        for (d = 0; d < 3; d++){
          for (e = 0; e < 4; e++){
            for (f = 0; f < 5; f++){
              arrPrecif[i][b] = [sku]
              arrPrecif[i][c] = [precoBruto]
              arrPrecif[i][d] = [precoPromocao]
              arrPrecif[i][e] = [dominio]
              arrPrecif[i][f] = [ganhador]
            }
          }
        }
      }
    }
  }
  
  //console.log(sku,precoBruto , precoPromocao, dominio, ganhador)
  return(arrPrecif)
}  
//getAmericanas()