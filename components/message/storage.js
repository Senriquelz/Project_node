const model = require('../../models/model')

const table = 'message'
const usersTable = 'users'

async function addMessage(message) {
    const myMessage = await model.create(table, message)
    return myMessage
}

function getMessages(filterUser) {
    return new Promise(async (resolve, reject) => {
        if (filterUser != null) {
            let filter = {
                name: filterUser
            }
    
            const users1 = await model.get(usersTable, filter)
            let data = []
            let data1 = await getMessagesWithUsers2(users1, 'user1_id')
            let data2 = await getMessagesWithUsers2(users1, 'user2_id')

            data1.forEach(element => data.push(element))
            data2.forEach(element => data.push(element))

            return resolve(data)
        } else {
            const messages = await model.get(table)
            const data = await getMessagesWithUsers(messages)
            return resolve(data)
        }   
    })
}

async function updateMessage(id, data) {
    const oMessage = await model.update(table, data, {id: id})
    return oMessage
}

async function deleteMessage(filters) {
    return await model.destroy(table, filters)
}

async function getMessagesWithUsers2(users, filter_column){
    let data = [] 
    for (let index = 0; index < users.length; index++)  {
        const element = users[index];
        filter = {}
        filter[`${ filter_column }`] = element.id
        
        let messages = await model.get(table, filter)
        messages = await getMessagesWithUsers(messages)
        messages.forEach(element2 => data.push(element2))
    }
    return data
}

async function getMessagesWithUsers(messages){
    let data = [] 
    for (let index = 0; index < messages.length; index++) {
        let element = messages[index]   

        let filter = {
            id: Number(element.user1_id)
        }

        let filter2 = {
            id: Number(element.user2_id)
        }
        
        const user2_id = await model.get(usersTable, filter)
        element['user2_id'] = user2_id[0]

        const user1_id = await model.get(usersTable, filter2)
        element['user1_id'] = user1_id[0]

        data.push( element )
    }
    return data
} 

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage,
}