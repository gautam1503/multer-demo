const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8001;
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Help in parsing the form data in json

// here upload is middleware
// const upload = multer({dest : "uploads/"})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename : function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
});

const upload = multer({storage});

app.get("/",(req,res)=>{
    return res.render("home");
});

// app.post("/upload",upload.single("profileImage"),(req,res)=>{
    app.post("/upload",upload.fields([{name:"profileImage"},{name:"coverImage"}]),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
