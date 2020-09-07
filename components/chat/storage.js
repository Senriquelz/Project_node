
const Model = require('./model')

function addChat(chat){
    const myChat = new Model(chat)
    myChat.save()
}
async function getChats(filterUser){
    return new Promise((resolve,reject)=>{
        let filter = {}
        if(filterUser != null){
            filter = {user:filterUser}
        }
        Model.find(filter)
            .populate('users')
            .exec((error,populated)=>{
                if (error) {
                    return reject(error)
                    
                }
                resolve(populated)
            })
    
    })


    
}
async function updateMessage(id,message){
    const foundmessages = await Model.findOne({_id:id})
    foundmessages.message = message
    const newMessage = foundmessages.save()
    
    return newMessage
}

function deleteMessage(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports ={
    add: addChat,
    list:getChats
    //update:updateMessage,
    //delete: deleteMessage
}