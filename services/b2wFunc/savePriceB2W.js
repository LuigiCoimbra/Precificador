import request from '../../helpers/sankhyaApiHelper.js'
import b2wPricer from '../../pricer/b2wPricer.js'

const b2wSavePricer = await b2wPricer()

var a = 0

const SavaPriceAm = async function () {
  for (a = 1; a < b2wSavePricer[0].length; a++) {
    //console.log(amazonCount[1][a])
    {
      const date = new Date().toLocaleDateString('pt-BR')
      const hour = new Date().toLocaleTimeString('pt-BR')
      console.log(date + ' ' + hour)
      const id = Math.floor(Math.random() * 10000000)

      const body = `
  <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
  <requestBody>
      <dataSet rootEntity="AD_LOGALTERPRECO">
          <entity path="">
              <fieldset list="*"/>
          </entity>
          <dataRow>
              <localFields>
                <DHATLTER>${date + ' ' + hour}</DHATLTER>
                <CODTAB>${b2wSavePricer[0][a][1]}</CODTAB>
                <CODPROD>${b2wSavePricer[0][a][2]}</CODPROD>
                <PRECOANT>${b2wSavePricer[0][a][4]}</PRECOANT>
                <PRECO>${b2wSavePricer[0][a][3]}</PRECO>
                <NUTAB>${b2wSavePricer[0][a][5]}</NUTAB>
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
SavaPriceAm()
export default SavaPriceAm
