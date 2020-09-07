const config = {

    dbUrl: process.env.DB_URL || 'mongodb+srv://ups:28791346lz@cluster0.ave3a.gcp.mongodb.net/ups?retryWrites=true&w=majority',
    port: process.env.PORT || 4002,
    host: process.env.POST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROOT || '/',
    filesRoute: process.env.FILES_ROUTE || 'files'

}

module.exports = config