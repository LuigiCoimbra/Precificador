import sankhyaApi from '../helpers/sankhyaApiHelper.js'

export default async function getPrecif () {
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
    LOGPRECO.SEQUENCIA,
    LOGPRECO.PRECOBRUTO                                                        precobuybox,
    LOGPRECO.GANHADOR                                                         lojabuybox,
    LOGPRECO.DOMINIO                                                     vendedorbuybux,
    LOGPRECO.PRECOPROMOCAO                                                     descontobuybox,
    LOGPRECO.DHALTER
FROM (select *
   from AD_LOGPRECOPRECIF
   where AD_LOGPRECOPRECIF.PRECOBRUTO IS NOT NULL
      AND AD_LOGPRECOPRECIF.DOMINIO<>'Produto nao cadastrado'
     AND AD_LOGPRECOPRECIF.GANHADOR<>'Tudo de Bicho'
     AND AD_LOGPRECOPRECIF.DHALTER = (SELECT MAX(LOG2.DHALTER)
                                FROM AD_LOGPRECOPRECIF LOG2
                                WHERE LOG2.CODPROD = AD_LOGPRECOPRECIF.CODPROD
                                  AND LOG2.DOMINIO = AD_LOGPRECOPRECIF.DOMINIO  AND LOG2.GANHADOR <> 'Tudo de Bicho II')) LOGPRECO
      INNER JOIN tgfpro
                 ON LOGPRECO.CODPROD = TGFPRO.CODPROD and tgfpro.AD_SKUB2W is not null
      INNER JOIN (SELECT *
                  FROM TGFEXC
                  WHERE NUTAB = (select max(tgftab.NUTAB) from tgftab where tgftab.CODTAB = 1)) PRECO
                 ON PRECO.CODPROD = TGFPRO.CODPROD

      INNER JOIN AD_CONFMKP ON AD_CONFMKP.VENDEDOR=8
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
TABPRECO.SEQUENCIA,
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
