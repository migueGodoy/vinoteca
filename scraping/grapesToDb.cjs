// import wines from '../db/wines.json' assert { type: "json" }
// const mysql = require('mysql')
const wines = require('../db/wines.json')

// const connection = mysql.createConnection({
//   host: 'sql11.freemysqlhosting.net',
//   user: 'sql11591990',
//   password: 'kblNu74VZd',
//   database: 'sql11591990'
// })

// connection.connect()

const allGrapes = []
wines.forEach(wine => {
  const { grapes, restOfWine } = wine
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
console.log(grapesWithoutDuplicates)
