//const database= require('../models')
//const Sequelize= require('sequelize')
const {PessoasServices} = require ('../services')
const pessoasServices = new PessoasServices()




class PessoasControllers{
//escopo padrao(defaultScope) é pegar todas as pessoas ativas
  static async getAllActivePeople (req, res) {
    try{
      const allPeople= await pessoasServices.pegarRegistrosAtivos()
      return   res.status(200).json(allPeople)
    }catch(err){
      console.log(err)
      return res.status(500).json(err.message)
    }
   
  }
  
  static async getAllPeople (req, res) {
    try{
      const allPeople= await pessoasServices.pegarTodosOsRegistros()
      res.status(200).json(allPeople)
    }catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async getOne (req, res) {
    const {id}= req.params
    try{
      const onePeople= await database.Pessoas.findOne({
        where:{
          id: Number(id) //Se como o params retorna string, passasse o Number justamente para converter o id para numero
        }}
        )
      return res.status(200).json(onePeople)
    }catch(err){
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  static async criation (req, res) {
      const newPeople= req.body
      try{
        const newPeopleCreated= await database.Pessoas.create(newPeople)
        res.status(201).json(newPeopleCreated)
      }catch(err){
        console.log(err)
        res.status(500).json(err.message)
      }
  }

  static async edit (req, res) {
    const {id}= req.params
    const infos= req.body
    try{
      await database.Pessoas.update( infos, {where:{id:Number(id)}})
      const newInfos= await database.Pessoas.findOne({where:{id:Number(id)}})
      res.status(200).json(newInfos)
    }catch(err){
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  static async remove (req, res) {
    const {id}= req.params
    try{
     await pessoasServices.apagaRegistro(Number(id))
      res.status(200).json({mensagem:`O cadastro de id ${id} foi deletado`})
    }catch(err){
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  //pessoas/:id_estudante/matriculas
  static async getAllMatriculas (req, res) {
    const {id_estudante}= req.params
    try{
      const getAllMatriculas= await database.Matriculas.findAll({where:{estudante_id: Number(id_estudante)}})
      res.status(200).json(getAllMatriculas)
    }catch(err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

  static async getTurmasLotadas (req, res) {
    const lotacao= 2 
    try{
      const turmasLotadas=  await database.Matriculas.findAndCountAll({where: {
        status: 'confirmado'
      },
    attributes: ['turma_id'],
    group: ['turma_id'],
    having: Sequelize.literal(`count(turma_id) >=${lotacao}`)
    })

      return res.status(200).json(turmasLotadas.count)
    }catch (err) {
      console.log(err.message)
      return res.status(500).json(err.message)
    }
  }

  static async getMatriculasByTurma (req, res) {
    const {id_turma}= req.params
    try {
      const matriculas= await database.Matriculas.findAndCountAll({where:{
        turma_id: Number(id_turma),
        status: 'confirmado',
      },
      limit: 20,
      order: [['estudante_id', 'ASC']]
    }
      )
     return  res.status(200).json(matriculas)
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

  static async criationMatricula (req, res) {
    const {id_estudante}= req.params
    const newMatricula= {...req.body, estudante_id: Number(id_estudante)}
    try{
     const newMatriculaCreated= await database.Matriculas.create(newMatricula)
     res.status(201).json(newMatriculaCreated)
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }
  // /pessoas/:id_estudante/matriculas/:id_matricula
  static async editMatricula (req, res) {
    const {id_estudante, id_matricula}= req.params
    const infos= req.body
    try {
       await database.Matriculas.update(infos, {where:{
         id: Number(id_matricula),
         estudante_id: Number(id_estudante)
       }})
       const newInfos= await database.Matriculas.findOne({where:{
         id: Number(id_matricula),
         estudante_id: Number(id_estudante)
       }})
       res.status(200).json(newInfos)
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

  // /pessoas/:id_estudante/matriculas/:id_matricula
  static async removeMatricula (req, res) {
    const {id_estudante, id_matricula}= req.params
    try{
      await database.Matriculas.destroy({where: {
        id: Number(id_matricula)
      }})
      res.status(200).json({mensagem: `A matricula de id ${id_matricula} foi deletada com sucesso :) !!!`})
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }
  
  // /pessoas/:id_estudante/matriculas/:id_matricula/restaurar
  static async recycleMatricula (req, res) {
    const {id_estudante, id_matricula}=  req.params
    try{
      await database.Matriculas.restore({where: {id: Number(id_matricula)}})
      res.status(200).json({mensage: `Matricula de id ${id_matricula}, restaurada com sucesso`})
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

  static async cancelStudent( req, res){
    const {id_estudante}= req.params
    try{
        await pessoasServices.cancelaPessoaEMatricula(Number(id_estudante))
        return res.status(204).json({mensagem: `Estudante de id ${id_estudante} cancelado`})
      
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

  //matriculas com escopo de associação
  static async getMatriculaOk(req, res){
    const {id_estudante}= req.params
    try{
      const person= await database.Pessoas.findOne({where:{id: Number(id_estudante)}})
      const matriculas= await person.getMatriculasOk()
      res.status(200).json(matriculas)
    }catch(err){
      console.log(err)
      res.status(500).json(err)
    }
  }
}

module.exports= PessoasControllers