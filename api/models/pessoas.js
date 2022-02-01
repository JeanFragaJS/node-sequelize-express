'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey:'docente_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey:'estudante_id',
        scope:{ status: 'confirmado'},
        as: 'matriculasOk'
      })

    }
  };
  Pessoas.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    email:{ 
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Formato de email inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    defaultScope:{
      where: {
        active:true
      }
    },
    scopes: {
      todos: { where: {} }
    },
    paranoid:true,

    modelName: 'Pessoas',
  });
  return Pessoas;
};