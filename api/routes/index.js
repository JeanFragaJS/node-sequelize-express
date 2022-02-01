const bodyParser = require('body-parser')
const {urlencoded}=  require('body-parser')
const express= require('express')

const pessoasRoutes= require('./pessoasRoutes')
const niveisRoutes= require('./niveisRoutes')
const turmasRoutes= require('./turmasRoutes')

module.exports= app=>{
  app.use(urlencoded({extended:true}))
  app.use(express.json())
  
  app.use(pessoasRoutes)
  app.use(niveisRoutes)
  app.use(turmasRoutes)
}