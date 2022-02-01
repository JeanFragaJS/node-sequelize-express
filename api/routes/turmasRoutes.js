const {Router}= require('express')
const TurmasControllers= require('../controllers/TurmasControllers')
const router= Router()

router.get('/turmas', TurmasControllers.getAll)
router.get('/turmas/:id', TurmasControllers.getOne)
router.post('/turmas', TurmasControllers.criation)
router.put('/turmas/:id', TurmasControllers.edit)
router.delete('/turmas/:id', TurmasControllers.remove)
router.post('/turmas/:id/restaurar', TurmasControllers.recycle)

module.exports= router