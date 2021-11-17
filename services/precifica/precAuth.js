import precificaApiHelper from '../../helpers/precificaApiHelper.js'

export default async function authentication () {
  try {
    const dt = await precificaApiHelper.get('/authentication',{
        headers:{
            'client_key': 'lgzZUpiOGhjJxyMff-4GrnRTou-hAAYj2YHVu07JtD50vxAptQr9u7chIAkJHjg=',
            'secret_key': 'wpWh5udZf82PeAbcHFrvEBxc2eFxg938juGy91H_jPqrcg=='
        }
    })
    const token = dt.data.data.token
    //console.log(dt.data.data.token)
    precificaApiHelper.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } catch (err) {
    console.log('ERROR ----', err)
  }
}
//authentication()