import express from 'express'
import userRoutes from "./routes/userRoutes"
import techRoutes from "./routes/techRoutes"
import { errorMiddleware } from "./middlewares/error";

const server = express()

server.use(express.json())
server.use(errorMiddleware)

server.use("/user", userRoutes);
server.use("/technologies", techRoutes)

const port = 3001
server.listen(port, () => {
    console.log(`server online on port ${port}`);
})

