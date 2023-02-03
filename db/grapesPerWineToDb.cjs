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

const grapesPerWines = []
USWines.forEach(wine => {
  const { grapes } = wine
  grapes?.forEach(grape => {
    const grapePerWine = {
      grape: grape.id,
      wine: wine.wineId
    }

    grapesPerWines.push(grapePerWine)
  })
})

spainWines.forEach(wine => {
  const { grapes } = wine
  grapes?.forEach(grape => {
    const grapePerWine = {
      grape: grape.id,
      wine: wine.wineId
    }

    grapesPerWines.push(grapePerWine)
  })
})

grapesPerWines.forEach(grapePerWine => {
  connection.query('INSERT INTO grapesPerWine SET ?', grapePerWine, function (error, results, fields) {
    if (error) console.log(error)
  })
})

connection.end()
