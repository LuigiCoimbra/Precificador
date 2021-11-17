import request from '../../helpers/sankhyaApiHelper.js';
import b2wPricer from '../../pricer/b2wPricer.js';

const b2wUpdatePricer = await b2wPricer();

var a = 0
//console.log (productArray[1][2])
async function UpdatePriceAm(){
for (a = 1; a <b2wUpdatePricer[0].length ; a++) {
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
                <VLRVENDA>${b2wUpdatePricer[0][a][3]}</VLRVENDA>
              </localFields>
              <key>
                <CODPROD>${b2wUpdatePricer[0][a][2]}</CODPROD>
                <NUTAB>${b2wUpdatePricer[0][a][5]}</NUTAB>
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
UpdatePriceAm()
export default UpdatePriceAm