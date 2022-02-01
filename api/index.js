const express= require('express')
const routes= require('./routes')

const app= express()
routes(app)

app.listen(3333, ()=>{
 console.log("welcome to api!!")
})

module.exports= app