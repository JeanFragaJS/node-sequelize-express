const database= require('../models')
const Sequelize= require('sequelize')
const Op= Sequelize.Op

  //  {where: {
  //    data_inicio: {
  //      [Op.gte]: data,
  //      [Op.lte]: data
  //      }
  //    }
  //  }

class TurmasControllers{
  static async getAll (req, res) {
    const {data_inicial, data_final}= req.query 
    const where = {}
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null 
    data_final ? where.data_inicio[Op.lte] = data_final : null 
    try{ 

      const allTurmas= await database.Turmas.findAll({ where })
      res.status(200).json(allTurmas)
    }catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  static async getOne (req, res) {
    const {id}= req.params
    try{
      const oneTurma= await database.Turmas.findOne({where: { id: Number(id) }})
      res.status(200).json(oneTurma)
    }catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  static async criation (req, res) {
    const newTurma= req.body
    try{
      const newTurmaCreated= await database.Turmas.create(newTurma)
      res.status(201).json(newTurmaCreated)
    }catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  static async edit (req, res) {
    const {id}= req.params
    const infos= req.body
    try{
      await database.Turmas.update(infos, {where: {id: Number(id)}})
      const newInfos= await database.Turmas.findOne({where: {id: Number(id)}})
      res.status(200).json(newInfos)
    }catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  static async remove (req, res) {
    const {id}= req.params
    try{
      await database.Turmas.destroy({where: {id: Number(id) }})
      res.status(200).json({mensagem: `Turma de id ${id} foi deletado com sucesso`})
    }catch (err){
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  // /turmas/:id/restaurar
  static async recycle (req, res) {
    const {id} = req.params
    try {
      await database.Turmas.restore({where: {id: Number(id)}})
      res.status(200).json({message: `Turma de id ${id} restaurada com sucesso :) !!!`})
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }
}

module.exports= TurmasControllers