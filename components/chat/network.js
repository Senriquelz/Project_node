const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()

router.get('/:userId', function (req, res) {
    controller.getChats(req.params.userId)
    .then((data)=>{
        response.success(req, res,data,200)
        
        console.log(messageList)
    })
    .catch((error)=>{
        response.error(req, res,'Error',500,error)
    })
})

router.patch('/:id', function (req, res){
    controller.updateMessage(req.params.id, res.body.message)
        .then((data)=>{
            response.success(req, res,data,200)
        })
        .catch((error)=>{
            response.error(req, res,'Error Chat',500,error)
        })

})

router.post('/', function (req, res) {
    console.log(req.body.users)

    controller.addChat(req.body.users).then((data) => {
        response.success(req, res, data, 201)
    }).catch((error) => {
        response.error(req, res, 'Error Chat', 500, 'Es un erro en el chat')
    })
   

})
router.delete('/:id', function(req, res) {
    controller.deleteMessage(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((error) => {
            response.error(req, res, 'Error interno.', 500, error)
        })
})

module.exports = router

