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

const allGrapes = []
wines.forEach(wine => {
  const { grapes } = wine
  if (grapes?.length) allGrapes.push(...grapes)
})

const grapesWithoutDuplicates = Array.from(new Set(allGrapes.map(grape => grape.id)))
  .map(id => allGrapes.find(a => a.id === id))

grapesWithoutDuplicates.sort((a, b) => a.id - b.id)
// grapesWithoutDuplicates.forEach(grape => {
//   connection.query('INSERT INTO grapes SET ?', grape, function (error, results, fields) {
//     if (error) console.log(error)
//   })
// })
