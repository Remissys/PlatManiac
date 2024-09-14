import express from 'express'
import cors from 'cors'

import 'dotenv/config'

console.log(process.env)

const app = express()
const port = 5000

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('server is running')
})

app.get('/requests/:function/:userid', async (req, res) => {

    var steamFunc = await import('./functions/steamRequests.js')

    var func = req.params.function
    var userId = req.params.userid

    var info = await steamFunc[func](userId)

    res.send(info)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})