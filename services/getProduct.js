import sankhyaApi from '../helpers/sankhyaApiHelper.js'

export default async function getProducts () {
  const sql = `
  with notas as  (select TGFITE.CODPROD, CASE WHEN TGFPRO.AD_IMPOSTOMEDIO>0  THEN TGFPRO.AD_IMPOSTOMEDIO ELSE avg(percimp) END   PERimp from TGFCAB
                                 INNER JOIN TGFITE  ON  TGFCAB.NUNOTA=TGFITE.NUNOTA
                                 INNER JOIN TGFPRO ON TGFITE.CODPROD = TGFPRO.CODPROD
                                 INNER JOIN (select sum(aliquota) percimp,nunota,sequencia from tgfdin where  codinc in (1 ,0) GROUP BY NUNOTA,SEQUENCIA) DIN
                                           ON DIN.NUNOTA=TGFITE.NUNOTA AND DIN.SEQUENCIA=TGFITE.SEQUENCIA
                        WHERE  TGFCAB.CODUFDESTINO=1  and TGFCAB.TIPMOV='V' AND TGFCAB.STATUSNOTA='L' AND TGFCAB.DTNEG>=SYSDATE-30
                        GROUP BY TGFITE.CODPROD,TGFPRO.AD_IMPOSTOMEDIO
                        )
                        , PRECO AS (SELECT DISTINCT TGFPRO.CODPROD ,TGFPRO.DESCRPROD,CUSMKP.COMISSAO,CUSMKP.PROMOCAO, CUSMKP.REEMBOLSO, CUSMKP.FRETEMEDIO,CUSMKP.METAMARGEM,case when CUS.CUSmed>CUS.cusger then CUS.cusmed else CUS.cusger end CUSTO FROM TGFPRO
                                         INNER JOIN (SELECT  * FROM TGFEXC
                                             WHERE   NUTAB = (select max(NUTAB) from tgftab where CODTAB=6)) PRECO ON  PRECO.CODPROD=TGFPRO.CODPROD
                                 INNER JOIN TGFVEN ON TGFVEN.CODVEND=37
                                 INNER JOIN AD_LOGPRECO ON AD_LOGPRECO.CODPROD = PRECO.CODPROD
                                 INNER JOIN (SELECT * FROM AD_CUSTOMKP WHERE REFERENCIA=(SELECT MAX(CD.REFERENCIA) FROM AD_CUSTOMKP CD WHERE CD.VENDEDOR=AD_CUSTOMKP.VENDEDOR))CUSMKP ON CUSMKP.VENDEDOR=TGFVEN.CODVEND
                                 INNER JOIN  (SELECT * FROM TGFCUS WHERE DTATUAL=(SELECT MAX(CD.DTATUAL) FROM TGFCUS CD WHERE CD.CODPROD=TGFCUS.CODPROD AND CD.CONTROLE=TGFCUS.CONTROLE AND CD.CODEMP=TGFCUS.CODEMP  )) CUS ON CUS.CODPROD=PRECO.codprod AND CUS.CODEMP=1
                        WHERE   (preco.codprod=AD_LOGPRECO.CODPROD )
                        )
                        
                        SELECT PRECO.CODPROD,DESCRPROD, PRECO.COMISSAO, PRECO.PROMOCAO, PRECO.REEMBOLSO, PRECO.CUSTO,PRECO.FRETEMEDIO,PERimp,PRECO.METAMARGEM,  trunc(sysdate) data
                        FROM PRECO
                        left JOIN NOTAS ON notas.CODPROD=PRECO.CODPROD
                                         
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
