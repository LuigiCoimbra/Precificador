import request from '../../helpers/sankhyaApiHelper.js'
import petlovePricer from '../../pricer/petlovePricer.js'

const petloveSavePricer = await petlovePricer()

var a = 0

const SavaPricePetlove = async function () {
  for (a = 1; a < petloveSavePricer[0].length; a++) {
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
                <CODTAB>${petloveSavePricer[0][a][1]}</CODTAB>
                <CODPROD>${petloveSavePricer[0][a][2]}</CODPROD>
                <PRECOANT>${petloveSavePricer[0][a][4]}</PRECOANT>
                <PRECO>${petloveSavePricer[0][a][3]}</PRECO>
                <NUTAB>${petloveSavePricer[0][a][5]}</NUTAB>
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
SavaPricePetlove()
export default SavaPricePetlove
