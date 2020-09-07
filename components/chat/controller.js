const use = require('./network')
const storage = require('./storage')
function addChat(users) {
    return new Promise(function (resolve, reject) {
        if (!users || !Array.isArray(users)) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Objeto Invalido')
        } else {
            const fullChat = {
                users: users
            }
            storage.add( fullChat)
            return resolve(fullChat)

        }
    })
}
function getChat(filterUser){
    return storage.get(fullChat)
    /*return new Promise((resolve,reject)=>{
        resolve(storage.list(filterUser))
    })*/
}
function updateMessage(id,message){
    //const foundmessages = await Model.findOne({id:id})
    //foundmessages.message = foundmessages.save()
    return new Promise( async (resolve,reject)=>{
        if(!id || !message){
            return  reject('Data Invalida')
            
        }
        const result = await storage.update(id,message)
        return resolve(result)
    })
    //return foundmessages
}
function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject('Id inválido.')
        }
        const result = storage.delete( id )
        return resolve( result )
    })
}
module.exports = {
    addChat,
    getChat,
    updateMessage,
    deleteMessage
}