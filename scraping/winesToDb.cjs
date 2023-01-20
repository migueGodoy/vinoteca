// const mysql = require('mysql')
const wines = require('../db/wines.json')

// const connection = mysql.createConnection({
//   host: 'sql11.freemysqlhosting.net',
//   user: 'sql11591990',
//   password: 'kblNu74VZd',
//   database: 'sql11591990'
// })

// connection.connect()

const winesWithFlatTaste = []
wines.forEach(wine => {
  const { grapes, ...restOfWine } = wine
  const { taste, ...restWithoutTaste } = restOfWine
  const wineWithFlatTaste = restWithoutTaste
  wineWithFlatTaste.acidity = taste?.acidity
  wineWithFlatTaste.fizziness = taste?.fizziness
  wineWithFlatTaste.intensity = taste?.intensity
  wineWithFlatTaste.sweetness = taste?.sweetness
  wineWithFlatTaste.tannin = taste?.tannin
  wineWithFlatTaste.userStructureCount = taste?.userStructureCount
  winesWithFlatTaste.push(wineWithFlatTaste)
})

// winesWithFlatTaste.forEach(wine => {
//   connection.query('INSERT INTO wines SET ?', wine, function (error, results, fields) {
//     if (error) console.log(error)
//   })
// })
