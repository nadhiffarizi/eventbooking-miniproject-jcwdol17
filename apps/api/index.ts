import express, { Application, Request, Response } from 'express'

const app: Application = express()
const PORT = 8000

app.use(express.json())
app.listen(PORT, () => {
    console.log("hello this is port: ", PORT);

})

//get register body
app.post("/register", (req: Request, res: Response) => {
    const message = req.body
    res.status(200).send({
        data_received: message
    })
})

// register body
// {
//     "first_name": "nadhif",
//         "last_name": "farizi",
//             "password": "testis",
//                 "role": "user",
//                     "email": "farizi@mail.com"
// }