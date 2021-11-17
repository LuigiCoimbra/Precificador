import request from '../../helpers/sankhyaApiHelper.js';
import getAmericanas from './precAm.js';

const getPrecifica = await getAmericanas();
//console.log('getPrecifica')
const SavaPricePrecif = async function(){
  var a = 0
    for (a = 1;a < getPrecifica.length; a++){
    console.table(getPrecifica)
{
  const date = new Date().toLocaleDateString('pt-BR')
  const hour = new Date().toLocaleTimeString('pt-BR')
  console.log(date + ' ' + hour)
  const id = Math.floor(Math.random() * 10000000)

  const body = `
  <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
  <requestBody>
      <dataSet rootEntity="AD_LOGPRECOPRECIF">
          <entity path="">
              <fieldset list="*"/>
          </entity>
          <dataRow>
              <localFields>
                <CODPROD>${getPrecifica[a][0]}</CODPROD>
                <SKU>${getPrecifica[a][0]}</SKU>
                <DOMINIO>${getPrecifica[a][3]}</DOMINIO>
                <DHALTER>${date + ' ' + hour}</DHALTER>
                <PRECOBRUTO>${getPrecifica[a][1]}</PRECOBRUTO>
                <PRECOPROMOCAO>${getPrecifica[a][2]}</PRECOPROMOCAO>
                <RANK></RANK>
                <GANHADOR>${getPrecifica[a][4]}</GANHADOR>
                <MARGEM></MARGEM>
              </localFields>
          </dataRow>
      </dataSet>
  </requestBody>
</serviceRequest>
`
  const { data } = await request.post(
    '/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
    body
  )

  console.log(data)
}
}
}
//SavaPrice()
export default SavaPricePrecif
