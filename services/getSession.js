import sankhyaApi from '../helpers/sankhyaApiHelper.js'

export default async function getSession() {
  try {
    const bodyLogin =
      '<serviceRequest serviceName="MobileLoginSP.login"><requestBody><NOMUSU>PRECIFICA</NOMUSU><INTERNO>preco1234</INTERNO></requestBody></serviceRequest>'
    const { data } = await sankhyaApi.get(
      '/service.sbr?serviceName=MobileLoginSP.login',
      { data: bodyLogin }
    )
    const jsession = data.split('<jsessionid>')[1].split('</jsessionid>')[0]
    sankhyaApi.defaults.headers.common.Cookie = `JSESSIONID=${jsession}`
    //console.log(jsession)
  } catch (err) {
    console.log('ERROR ----', err)
  }
}
//<NOMUSU>cortex2</NOMUSU><INTERNO>123456789</INTERNO>
//getSession()
