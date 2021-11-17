import request from '../../helpers/sankhyaApiHelper.js';
import b2wPricer from '../../pricer/b2wPricer.js';


const b2wPricerMarg = await b2wPricer();
//const idMg = await id()
//const productArray = await arrProd();
//const margemArray = await arrMarg()
console.table(b2wPricerMarg[1])
//console.log(margemMg)
//console.log(idMg)
var a = 0

async function saveMargemB2W(){
for (a = 1; a < b2wPricerMarg[0].length ; a++) {
//var codtab=productArray[a][2]
//console.log (amazonCount[0][a][1])
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
                <MARGEM>${b2wPricerMarg[1][a][1]}</MARGEM>
              </localFields>
              <key>
                <SEQUENCIA>${b2wPricerMarg[1][a][0]}</SEQUENCIA>
              </key>
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
export default saveMargemB2W
saveMargemB2W()