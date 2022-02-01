
const database = require ('../models')
const Services = require('./Services')

class PessoasServices extends Services {
  constructor () {
    super ('Pessoas')
    this.matriculas = new Services('Matriculas')
  }

  async pegarRegistrosAtivos (where = {}) {
    return database[this.nomeDoModel].findAll({where: {...where}})
  }

  async pegarTodosOsRegistros (where = {}) {
    return database[this.nomeDoModel].scope('todos').findAll({ where: {...where}})
  }

  async cancelaPessoaEMatricula (estudanteID) {
    return database.sequelize.transaction( async transacao => {
      await super.atualizaregistro({active: false}, estudanteID, {trasaction:transacao} )
      await this.matriculas.atualizaregistros({status: 'cancelado'}, {estudante_id: estudanteID}, {transaction: transacao})
    })
  }

}
 
module.exports = PessoasServices 