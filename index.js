import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import { error } from "console";
import userRoutes from "./routes/user.js"
import courseRoutes from "./routes/course.js"
import registerRoutes from "./routes/auth.js"

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
dotenv.config()
const app=express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginOpenerPolicy({policy:"same-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use(multer().array())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})

/*routes*/
app.use('/auth',registerRoutes)
app.use('/user',userRoutes)
app.use('/course',courseRoutes)



/*mogoose*/
const PORT=process.env.PORT||9000


mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`server listening at ${PORT}`))
}).catch((error)=>console.log(`${error} did not connect ${process.env.MONGO_URL}`))

