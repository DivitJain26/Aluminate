import { app } from "./app.js";
import connectDB from "./config/db.js"
import { getEnv } from "./utils/env.js";

const PORT = getEnv('PORT') || 5000

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(`MongoDB connection error`, err)
    })

