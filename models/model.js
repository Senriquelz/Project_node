const get = async (table, filters = null) => {
    let sql = 'SELECT * FROM '+table
    let values = []
    if (!!filters) {
        sql += ' WHERE '
        let iterator = 1
        let filtersAux = []
        for(let index in filters){
            filtersAux.push( index + ' = $' + iterator )
            values.push( filters[index] )
            iterator++
        }
        sql += filtersAux.join(' AND ')
    }
    sql += ' ORDER BY id';
    const result = await pool.query(sql, values)
    return result.rows
}

const create = async (table, data) => {
    let sql = 'INSERT INTO '+table+' ('
    let fields = []
    let values = []
    let finalValues = []
    let iterator = 1
    for(let index in data){
        fields.push(index)
        values.push('$'+iterator)
        finalValues.push(data[index])
        iterator++
    }
    sql += fields.join(',') + ') VALUES (' + values.join(',') + ')'
    const result = await pool.query(sql, finalValues)
    return result
}

const update = async (table, data, filters = null) => {
    let sql = 'UPDATE '+table+' SET '
    let iterator = 1
    let fieldsAndValues = []
    let finalValues = []
    for(let index in data){
        fieldsAndValues.push( index + ' = $' + iterator )
        finalValues.push( data[index] )
        iterator++
    }
    sql += fieldsAndValues.join(', ')

    if (!!filters) {
        sql += ' WHERE '
        let filtersAux = []
        for(let index in filters){
            filtersAux.push( index + ' = $' + iterator )
            finalValues.push( filters[index] )
            iterator++
        }
        sql += filtersAux.join(' AND ')
    }
    const result = await pool.query(sql, finalValues)
    return result
}

const destroy = async (table, filters = null) => {
    sql = 'DELETE FROM '+table
    let values = []
    if (!!filters) {
        sql += ' WHERE '
        let iterator = 1
        let filtersAux = []
        for(let index in filters){
            filtersAux.push( index + ' = $' + iterator )
            values.push( filters[index] )
            iterator++
        }
        sql += filtersAux.join(' AND ')
    }
    const result = await pool.query(sql, values)
    return result
}

module.exports = {
    get,
    create,
    update,
    destroy,
}