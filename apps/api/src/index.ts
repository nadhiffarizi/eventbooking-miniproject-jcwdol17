import { App } from './app'

const app = new App()
app.start()

// //get register user, required data:
// // first_name, last_name, password, role, email
// app.post("/register", createUser)

// app.get("/users", getUsers)


// app.use((error: Error, req: Request, res: Response) => {
//     res.status(500).send({
//         message: error.message
//     })
// })