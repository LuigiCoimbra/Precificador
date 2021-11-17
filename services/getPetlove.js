import sankhyaApi from '../helpers/sankhyaApiHelper.js'

export default async function getPetlove() {
  const sql = `
  with TABPRECO AS (SELECT TGFPRO.CODPROD,
    TGFPRO.DESCRPROD,
    CUSMKP.COMISSAO,
    CUSMKP.PROMOCAO,
    CUSMKP.REEMBOLSO,
    CUSMKP.FRETEMEDIO,
    CUSMKP.METAMARGEM,
    case when CUS.CUSmed > CUS.cusger then CUS.cusmed else CUS.cusger end CUSTO,
    PRECO.nutab,
    SNK_PRECO(AD_CONFMKP.CODTAB,TGFPRO.CODPROD),
    AD_CONFMKP.CODTAB,
    LOGPRECO.ID,
    replace(LOGPRECO.PRECO,'R$','')                                                        precobuybox,
    LOGPRECO.LOJA                                                         lojabuybox,
    LOGPRECO.VENDEDOR                                                     vendedorbuybux,
    LOGPRECO.DESCONTO                                                     descontobuybox,
    LOGPRECO.DTALTER
FROM (select *
   from AD_LOGPRECO
   where AD_LOGPRECO.LOJA = 'Petlove'
     AND AD_LOGPRECO.PRECO IS NOT NULL
     and PROCESSADO IS NULL
    AND AD_LOGPRECO.VENDEDOR <> 'null'
     AND AD_LOGPRECO.DTALTER = (SELECT MAX(LOG2.DTALTER)
                                FROM AD_LOGPRECO LOG2
                                WHERE LOG2.CODPROD = AD_LOGPRECO.CODPROD
                                  AND LOG2.LOJA = AD_LOGPRECO.LOJA)) LOGPRECO
      INNER JOIN tgfpro
                 ON LOGPRECO.CODPROD = TGFPRO.CODPROD 
      INNER JOIN (SELECT *
                  FROM TGFEXC
                  WHERE NUTAB = (select max(tgftab.NUTAB) from tgftab where tgftab.CODTAB = 3)) PRECO
                 ON PRECO.CODPROD = TGFPRO.CODPROD

      INNER JOIN AD_CONFMKP ON AD_CONFMKP.VENDEDOR=14
      INNER JOIN (SELECT *
                  FROM AD_CUSTOMKP
                  WHERE AD_CUSTOMKP.REFERENCIA = (SELECT MAX(CD.REFERENCIA)
                                                  FROM AD_CUSTOMKP CD
                                                  WHERE CD.VENDEDOR = AD_CUSTOMKP.VENDEDOR)) CUSMKP
                 ON CUSMKP.VENDEDOR = AD_CONFMKP.VENDEDOR
      INNER JOIN (SELECT *
                  FROM TGFCUS
                  WHERE TGFCUS.DTATUAL = (SELECT MAX(CD.DTATUAL)
                                          FROM TGFCUS CD
                                          WHERE CD.CODPROD = TGFCUS.CODPROD
                                            AND CD.CONTROLE = TGFCUS.CONTROLE
                                            AND CD.CODEMP = TGFCUS.CODEMP)) CUS
                 ON CUS.CODPROD = PRECO.codprod AND CUS.CODEMP = 1
),

notas as (select TGFITE.CODPROD,
 CASE WHEN TGFPRO.AD_IMPOSTOMEDIO > 0 THEN TGFPRO.AD_IMPOSTOMEDIO ELSE avg(percimp) END PERimp
from TGFCAB
   INNER JOIN TGFITE ON TGFCAB.NUNOTA = TGFITE.NUNOTA
   INNER JOIN TABPRECO ON tgfite.codprod = TABPRECO.codprod
   INNER JOIN TGFPRO ON TGFITE.CODPROD = TGFPRO.CODPROD
   INNER JOIN (select sum(aliquota) percimp, nunota, sequencia
               from tgfdin
               where codinc in (1, 0)
               GROUP BY NUNOTA, SEQUENCIA) DIN
              ON DIN.NUNOTA = TGFITE.NUNOTA AND DIN.SEQUENCIA = TGFITE.SEQUENCIA
WHERE TGFCAB.CODUFDESTINO = 1
and TGFCAB.TIPMOV = 'V'
AND TGFCAB.STATUSNOTA = 'L'
AND TGFCAB.DTNEG >= SYSDATE - 30
GROUP BY TGFITE.CODPROD, TGFPRO.AD_IMPOSTOMEDIO
)

SELECT 
TABPRECO.ID,
TABPRECO.CODPROD,
TABPRECO.DESCRPROD,
TABPRECO.COMISSAO,
TABPRECO.PROMOCAO,
TABPRECO.REEMBOLSO,
TABPRECO.CUSTO,
TABPRECO.FRETEMEDIO,
NOTAS.PERimp,
TABPRECO.METAMARGEM,
trunc(sysdate) as data,
precobuybox,
lojabuybox,
vendedorbuybux,
descontobuybox,
SNK_PRECO(TABPRECO.CODTAB,TABPRECO.CODPROD),
TABPRECO.CODTAB,
TABPRECO.NUTAB
FROM TABPRECO
left JOIN NOTAS ON notas.CODPROD = TABPRECO.CODPROD
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
