const {Router}= require('express')
const NiveisControllers= require('../controllers/NiveisControllers')
const router= Router()

router.get('/niveis', NiveisControllers.getAll)
router.get('/niveis/:id', NiveisControllers.getOne)
router.post('/niveis', NiveisControllers.criation)
router.put('/niveis/:id', NiveisControllers.edit)
router.delete('/niveis/:id', NiveisControllers.remove)
router.post('/niveis/:id/restaurar', NiveisControllers.recycle)

module.exports= router