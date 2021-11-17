import sankhyaApi from '../helpers/sankhyaApiHelper.js'

export default async function logoutSession() {
  try {
    const bodyLogin =
      '<serviceRequest serviceName="MobileLoginSP.logout"><requestBody></requestBody></serviceRequest>'
    const { data } = await sankhyaApi.post(
      '/service.sbr?serviceName=MobileLoginSP.logout',
      { data: bodyLogin }
    )
    console.log(data)
    console.log('==================LOGOUT======================')
  } catch (err) {
    console.log('ERROR ----', err)
  }
}
//<NOMUSU>cortex2</NOMUSU><INTERNO>123456789</INTERNO>
//logoutSession()
