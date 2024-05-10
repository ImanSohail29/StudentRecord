const express = require('express');
const {createServer}=require("http")
const cors=require('cors')

const app = express();
app.use(cors({
    origin:["https://student-record-client-hhz2bot8r-imansohail29s-projects.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:false
}))
app.use(express.json())

const port = 5000

const apiRoutes = require("./routes/apiRoutes")
app.use('/api', apiRoutes)

// app.listen(port, () => {
//     console.log(`My app listening on port ${port}`)
//   })
const httpServer=createServer(app)
httpServer.listen(port,()=>console.log(`My app listening on port ${port}`))
