import express, { Application, Request, Response } from 'express'

const app: Application = express()
const PORT = 8000

app.listen(PORT, () => {
    console.log("hello this is port: ", PORT);

})