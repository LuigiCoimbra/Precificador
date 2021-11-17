import request from '../../helpers/sankhyaApiHelper.js'
import amzCount from '../../pricer/amazonPricer.js'

const amazonCount = await amzCount()
//const idMg = await id()
//const productArray = await arrProd();
//const margemArray = await arrMarg()
//console.table(margemArray)
//console.log(margemMg)
//console.log(idMg)
var a = 0

async function saveMargem() {
  for (a = 1; a < amazonCount[0].length; a++) {
    //var codtab=productArray[a][2]
    //console.log (amazonCount[0][a][1])
    {
      console.log('saveMargemAMZ [x]')
      const date = new Date().toLocaleDateString('pt-BR')
      const hour = new Date().toLocaleTimeString('pt-BR')
      console.log(date + ' ' + hour)
      const id = Math.floor(Math.random() * 10000000)

      const body = `
  <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
  <requestBody>
      <dataSet rootEntity="AD_LOGPRECO">
          <entity path="">
              <fieldset list="*"/>
          </entity>
          <dataRow>
              <localFields>
                <MARGEM>${amazonCount[0][a][1]}</MARGEM>
              </localFields>
              <key>
                <ID>${amazonCount[0][a][0]}</ID>
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
export default saveMargem
saveMargem()
