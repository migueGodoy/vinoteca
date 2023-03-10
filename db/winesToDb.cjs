const mysql = require('mysql')
const wines = require('./data/wines.json')
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
  const { grapes, pageFrom, ...restOfWine } = wine
  winesWithFlatTaste.push(restOfWine)
})

winesWithFlatTaste.forEach(wine => {
  connection.query('INSERT INTO wines SET ?', wine, function (error, results, fields) {
    if (error) console.log(error)
  })
})

connection.end()
