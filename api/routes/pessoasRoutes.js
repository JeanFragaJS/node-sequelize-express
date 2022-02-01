const {Router}= require('express')
const PessoasControllers= require('../controllers/PessoasControllers')
const router= Router()

router.get('/pessoas/active', PessoasControllers.getAllActivePeople) // endpoint "/pessoas"
router.get('/pessoas', PessoasControllers.getAllPeople)
router.get('/pessoas/:id',PessoasControllers.getOne )

router.get('/pessoas/:id_estudante/matriculas',PessoasControllers.getAllMatriculas)
router.get('/pessoas/matriculas/:id_turma/confirmados', PessoasControllers.getMatriculasByTurma)
router.get('/pessoas/:id_estudante/matriculas_confirmadas', PessoasControllers.getMatriculaOk)

router.get('/pessoas/matriculas/lotada', PessoasControllers.getTurmasLotadas)

router.post('/pessoas', PessoasControllers.criation)
router.post('/pessoas/:id_estudante/matriculas/:id_matricula/restaurar', PessoasControllers.recycleMatricula)
router.post('/pessoas/:id_estudante/matriculas', PessoasControllers.criationMatricula)
router.post('/pessoas/:id_estudante/cancela', PessoasControllers.cancelStudent)

router.delete('/pessoas/:id', PessoasControllers.remove)
router.delete('/pessoas/:id_estudante/matriculas/:id_matricula', PessoasControllers.removeMatricula)

router.put('/pessoas/:id', PessoasControllers.edit)
router.put('/pessoas/:id_estudante/matriculas/:id_matricula', PessoasControllers.editMatricula)


module.exports= router