//const use = require('./network')
const storage = require('./storage')
const config = require('../../config')
const socket = require('../../socket').socket

function addMessage(user1_id, user2_id, message, file) {
    return new Promise(function (resolve, reject) {
        if (!user1_id || !user2_id || !message) {
            console.log('[Message Controller] No hay usuario o mensaje')
            return reject('Los datos son incorrectos')
        } else {

            let fileUrl = ''
            if (file) {
                fileUrl = config.filesRoute + '/' + file.filename
            }

            const fullMessage = {
                user1_id: user1_id,
                user2_id: user2_id,
                message: message,
                date: new Date(),
                file: fileUrl
            }
            const result = storage.add(fullMessage)
            //socket.io.emit('message', fullMessage)
            return resolve(result)
        }
    })
}

function getMessages(filter_user) {
    return new Promise((resolve, reject) => {
        resolve(storage.list(filter_user))
    })
}

function updateMessage(id, message) {
    return new Promise((resolve, reject) => {
        if (!id || !message) {
            return reject('Data Inválida')
        }
        const data = {
            message: message,
        }
        const result = storage.update(id, data)
        return resolve(result)
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject('Id Inválida')
        }
        const filters = {
            id: id
        }
        const result = storage.delete(filters)
        return resolve(result)
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}