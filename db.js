const db = require('mongoose')

db.Promise = global.Promise

async function connect (uri){
    
    await db.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('[db] Conexión Exitosa')
    }).catch(() => {
        console.error('[db] Problemas con la conexión')
    })
}

module.exports = connect