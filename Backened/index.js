const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const eventRoutes = require("./Routes/postRoutes")
const registrationRoutes = require('./Routes/registrationRoutes');
const PaymentRoutes = require('./Routes/PaymentRoutes');



const userRouter = require("./Controller/userController")

dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
const port = 3003;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected")).catch((e)=>console.log(e))

// mongoose.connect("mongodb://127.0.0.1/EMS").then(()=>{
//   console.log("connected to database");
// }).catch((e)=>{
//   console.log(e)
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,  uniqueSuffix + file.originalname);
    }
  })

  const upload = multer({storage:storage});

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use("/user",userRouter);
  app.use("/post",eventRoutes);
  app.use('/registration',registrationRoutes)
  app.use('/payment',PaymentRoutes);
  app.post('/uploads',upload.single('image'),(req,res)=>{
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({imageUrl});
  })

app.listen(port, ()=> (console.log(`Serveris Running on ${port}`)));
