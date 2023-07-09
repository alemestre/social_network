require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./mongo/mongoose')
const bodyParser = require('body-parser')
const userCtrl = require('./controller/userController')
const postCtrl = require('./controller/postController')
const middleware= require('./middleware/middleware')
const mongoSanitize = require('express-mongo-sanitize');


const port = process.env.PORT
connectDB()

const app = express()

app.use(mongoSanitize());
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173'
}))

app.use(bodyParser.urlencoded({ extended: true }));


//import des routes
const userRoutes= require('./routes/user')
const postRoutes= require('./routes/post')

// on configure les routes
app.use('/user', userRoutes)
app.use('/posts', postRoutes)


// routes liées à l'authentification et la création de compte
app.post('/signin', userCtrl.signIn)
app.post('/signup', userCtrl.signUp)


app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
