const database=  require('../models')

class Services {
  constructor(nomeDoModel){
    this.nomeDoModel= nomeDoModel
  }

  async pegaTodosOsRegistros () {
    return database[this.nomeDoModel].findAll()
  }

  async atualizaregistro ( dadosASeremAtualizados, id, trasacao = {})  {
    return database[this.nomeDoModel].update(dadosASeremAtualizados, {where: { id: id}}, trasacao)
  }

  async atualizaregistros (dadosASeremAtualizados, where, transacao = {}) {
    return database[this.nomeDoModel].update(dadosASeremAtualizados, {where: {... where} }, {transaction: transacao})
  }

  async apagaRegistro (id) {
    return database[this.nomeDoModel].destroy({ where: {id: id}})
  }

}

module.exports = Services