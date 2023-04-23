require('dotenv').config()


const express=require ('express')
const expressLayouts=require ('express-ejs-layouts')
const index=require ('./routes/index')

//init express
const app=express()

//set view engine and layout folder
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

//connect to db
const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL , {
    usenewurlparser: true,
    useunifiedtopology: true,
})
const db=mongoose.connection
db.on('error', error=>console.error(error))
db.once('open', ()=>console.log('connected to mongodb'))

//set public folder
app.use(express.static('public'))

//set routes
app.use('/', index )

//start server
app.listen(process.env.PORT || 3000)