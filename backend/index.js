const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db  = require('./utils/db')
const bodyParser = require('body-parser')
const app = express()
const authRouter = require('./router/user.router')
const stripeRouter = require('./router/stripe.router')
const scanRouter = require('./router/scan.router')
const errorMiddleware = require('./middleware/error.middleware')

const port = process.env.PORT || 3000

app.use('/stripe/webhook', bodyParser.raw({type: "*/*"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use('/auth',authRouter)
app.use('/scan',scanRouter)
app.use('/stripe',stripeRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})