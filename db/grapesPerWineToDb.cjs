const mysql = require('mysql')
const wines = require('../db/wines.json')

const connection = mysql.createConnection({
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11591990',
  password: 'kblNu74VZd',
  database: 'sql11591990'
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
