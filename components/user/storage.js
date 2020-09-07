const model = require('../../models/model')

const table = 'users'


async function addUser(user) {
    const newUser = await model.create(table, user)
    return newUser
}

async function getUsers(filterName) {
    let filter = null
    if (filterName != null) {
        filter = {
            name: filterName
        }
    }
    return await model.get(table, filter)
}

async function updateUser(id, data, filters) {
    const user = await model.update(table, data, filters)
    return user
}

async function deleteUser(filters) {
    return await model.destroy(table, filters)
}

module.exports = {
    add: addUser,
    list: getUsers,
    update: updateUser,
    delete: deleteUser,
}