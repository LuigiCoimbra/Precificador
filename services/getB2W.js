import sankhyaApi from '../helpers/sankhyaApiHelper.js'

export default async function getB2W () {
  const sql = `
  SELECT PRO.CODPROD, NUTAB, AD_SKUB2W 
    FROM TGFPRO PRO INNER JOIN TGFEXC EXC ON PRO.CODPROD = EXC.CODPROD
    WHERE AD_SKUB2W IS NOT NULL 
    AND NUTAB = (SELECT MAX(NUTAB) FROM tgftab WHERE CODTAB=1) 
    AND AD_PROCESSADO IS NULL ORDER BY AD_PRECO_BUYBOX DESC

`
  const body = {
    serviceName: 'DbExplorerSP.executeQuery',
    requestBody: {
      sql
    }
  }

  const { data } = await sankhyaApi.get(
    '/service.sbr?serviceName=DbExplorerSP.executeQuery',
    {
      data: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const items = data.responseBody.rows
  return items
}
