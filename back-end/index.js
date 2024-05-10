const express = require('express');
const {createServer}=require("http")
const cors=require('cors')

const app = express();
app.use(express.json())

const port = 5000

const apiRoutes = require("./routes/apiRoutes")
app.use('/api', apiRoutes)

// app.listen(port, () => {
//     console.log(`My app listening on port ${port}`)
//   })
const httpServer=createServer(app)
httpServer.listen(port,()=>console.log(`My app listening on port ${port}`))
