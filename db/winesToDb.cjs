const mysql = require('mysql')
const USWines = require('./data/US wines.json')
const spainWines = require('./data/Spain wines.json')
const dbConfig = require('./config/dbConnection.json')

const connection = mysql.createConnection({
  host: dbConfig.server,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})

connection.connect()

const winesWithFlatTaste = []
USWines.forEach(wine => {
  const { grapes, pageFrom, ...restOfWine } = wine
  winesWithFlatTaste.push(restOfWine)
})

spainWines.forEach(wine => {
  const { grapes, pageFrom, ...restOfWine } = wine
  winesWithFlatTaste.push(restOfWine)
})

winesWithFlatTaste.forEach(wine => {
  connection.query('INSERT INTO wines SET ?', wine, function (error, results, fields) {
    if (error) console.log(error)
  })
})
