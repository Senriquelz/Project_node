const { Pool } = require('pg')

const config = {
    host: 'localhost',
    port: '5432',
    database: 'chat',
    user: 'postgres',
    password: '28791346lz'
}

const pool = new Pool(config)

module.exports = pool