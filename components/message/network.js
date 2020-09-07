const express = require('express')
const multer = require('multer')

const config = require('../../config')
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router()


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/' + config.filesRoute + '/')
    },
    filename: function(req, file, cb){
        const [name, extension] = file.originalname.split('.')
        cb(null, `${ name }-${ Date.now() }.${ extension }`)
    }
})
const upload = multer({storage: storage})


router.get('/', function (req, res) {

    const filterMessage = req.query.user_name || null

    controller.getMessages(filterMessage).then(messagesList => {
        response.success(req, res, messagesList, 200)
    }).catch(error => {
        response.error(req, res, 'Error en la lista', 500, error)
    })
})

router.post('/', upload.single('file'), function (req, res) {

    controller.addMessage(req.body.user1_id, req.body.user2_id, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201)
    }).catch((error) => {
        response.error(req, res, 'Error simulado', 500, error)
    })

})

router.patch('/:id', function (req, res) {
    controller.updateMessage(req.params.id, req.body.message).then(result => {
        response.success(req, res, result, 200)
    }).catch(error => {
        response.error(req, res, 'Error interno', 500, 'Detalle de error')
    })
})

router.delete('/:id', function (req, res) {
    controller.deleteMessage(req.params.id).then(result => {
        response.success(req, res, result, 200)
    }).catch(error => {
        response.error(req, res, 'Error interno', 500, 'Detalle de error')
    })
})

router.delete('/', function (req, res) {
    response.success(req, res, 'Hola Delete')
})

module.exports = router