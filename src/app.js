import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.set("json spaces", 3)
app.use(cors())
export default app