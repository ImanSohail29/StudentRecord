const express = require("express")
const app = express()
const studentRoutes=require("./studentRoutes")

app.use("/students", studentRoutes)


module.exports = app