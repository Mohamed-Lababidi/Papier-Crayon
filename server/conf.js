const mysql = require('mysql2')

require('dotenv').config(process.cwd(), '../.env')

const dbSettings = typeof process.env.CLEARDB_DATABASE_URL === 'string'
  ? process.env.CLEARDB_DATABASE_URL
  : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }

const d = new Date()
const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
console.log(date)

const connection = mysql.createPool(dbSettings)

module.exports = connection
