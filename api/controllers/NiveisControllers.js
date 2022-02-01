//const database= require('../models')
const Services= require('../services/Services')
const niveisServices= new Services('Niveis')


class NiveisControllers{
  static async getAll (req, res) {
    try{    
      const allLevels= await niveisServices.pegaTodosOsRegistros()
      res.status(200).json(allLevels)
    }catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async getOne (req, res) {
    const {id}= req.params
    try{
      const oneLevel= await database.Niveis.findOne({where: {id: Number(id) }})
      res.status(200).json(oneLevel)
    }catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async criation (req, res) {
    const newLevel= req.body
    try{
      const newLevelCreated= await database.Niveis.create(newLevel)
      res.status(201).json(newLevelCreated)
    }catch (err) {
      console.log(err)
    }
  }

  static async edit (req, res) {
    const {id}= req.params
    const infos=  req.body
    try{
     await database.Niveis.update(infos, {where: { id: Number(id) }})
     const newInfos= await database.Niveis.findOne({where:{id: Number(id)}})
     res.status(200).json(newInfos)
    }catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }

  static async remove (req, res) {
    const {id}=  req.params
    try{
      await database.Niveis.destroy({where:{id:Number(id)}})
      res.status(200).json({messagem: `nivel de id ${id} deletado com sucesso`})
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

  // /niveis/:id/restaurar
  static async recycle (req, res) {
    const {id}=  req.params
    try {
      await database.Niveis.restore({where: { id: Number(id)}})
      res.status(200).json({message:`Nivel de id ${id} restaurado com sucesso`})
    }catch (err) {
      console.log(err.message)
      res.status(500).json(err.message)
    }
  }

}

module.exports= NiveisControllers