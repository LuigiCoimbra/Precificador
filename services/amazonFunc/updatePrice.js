import request from '../../helpers/sankhyaApiHelper.js';
import amzCount from '../../pricer/amazonPricer.js';
//import arrProd from '../../pricer/amazonPricer.js';

const amazonCount = await amzCount();
//const productArray = await arrProd();
//console.table(productArray)
//console.log(productArray.length)
var a = 0
//console.log (productArray[1][2])
async function UpdatePrice(){
for (a = 1; a <amazonCount[1].length ; a++) {
//var codtab=productArray[a][2]
{
  const date = new Date().toLocaleDateString('pt-BR')
  const hour = new Date().toLocaleTimeString('pt-BR')
  console.log(date + ' ' + hour)
  const id = Math.floor(Math.random() * 10000000)

  const body = `
  <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
  <requestBody>
      <dataSet rootEntity="Excecao">
          <entity path="">
              <fieldset list="*"/>
          </entity>
          <dataRow>
              <localFields>
                <VLRVENDA>${amazonCount[1][a][3]}</VLRVENDA>
              </localFields>
              <key>
                <CODPROD>${amazonCount[1][a][2]}</CODPROD>
                <NUTAB>${amazonCount[1][a][5]}</NUTAB>
                <CODLOCAL>0</CODLOCAL>
                <CONTROLE> </CONTROLE>
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
UpdatePrice()
export default UpdatePrice