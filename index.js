import cron from 'node-cron'
import getSession from './services/getSession.js'
import logoutSession from './services/logoutSession.js'
import SavaPrice from './services/amazonFunc/savePriceAmz.js'
import UpdatePrice from './services/amazonFunc/updatePrice.js'
import saveMargem from './services/amazonFunc/saveMargem.js'
import saveMargemB2W from './services/b2wFunc/saveMargemB2W.js'
import SavaPriceAm from './services/b2wFunc/savePriceB2W.js'
import UpdatePriceAm from './services/b2wFunc/updatePriceB2W.js'
import SavaPricePrecif from './services/precifica/insertPrecoPrecif.js'

cron.schedule('*/20 * * * *', () => {
  getSession()
  //Amazon
  SavaPrice()
  UpdatePrice()
  saveMargem()
  logoutSession()
})
cron.schedule('*/20 * * * *', () => {
  getSession()
  //B2W
  SavaPriceAm()
  UpdatePriceAm()
  saveMargemB2W()

  //Petlove
  logoutSession()
})

cron.schedule('0 * * * *', () => {
  getSession()
  //console.log('cron 2 ativo')
  SavaPricePrecif()
  logoutSession()
})
