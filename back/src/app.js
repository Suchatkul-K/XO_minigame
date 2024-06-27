import express from "express"
import { config } from "dotenv"
import cors from "cors"
import notFound from "./middlewares/not-found.js";
import errorMiddleware from "./middlewares/error.js";
import * as authRoute from "./routes/auth-route.js"
import * as replayRoute from "./routes/replay-route.js"

config();
const app = express();

app.use(cors())
app.use(express.json())

app.use("/auth", authRoute.router)
app.use("/replay", replayRoute.router)

app.use(notFound)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000 
app.listen(PORT, () => console.log('Server running on port: ', PORT))