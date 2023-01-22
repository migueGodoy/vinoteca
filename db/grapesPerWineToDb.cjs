const mysql = require('mysql')
const wines = require('../db/wines.json')
const dbConfig = require('./config/dbConnection.json')

const connection = mysql.createConnection({
  host: dbConfig.server,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})

connection.connect()

const grapesPerWines = []
wines.forEach(wine => {
  const { grapes } = wine
  grapes?.forEach(grape => {
    const grapePerWine = {
      grape: grape.id,
      wine: wine.id
    }

    grapesPerWines.push(grapePerWine)
  })
})

// grapesPerWines.forEach(grapePerWine => {
//   connection.query('INSERT INTO grapesPerWine SET ?', grapePerWine, function (error, results, fields) {
//     if (error) console.log(error)
//   })
// })
