const mysql = require('mysql')
const wines = require('./wines.json')
const dbConfig = require('./config/dbConnection.json')

const connection = mysql.createConnection({
  host: dbConfig.server,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})

connection.connect()

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
