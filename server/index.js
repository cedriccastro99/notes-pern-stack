const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

    //ROUTES

    //register and login route
    app.use("/auth",require("./routes/jwtAuth"));

    //dashboard route
    app.use("/dashboard",require("./routes/dashboard"));

    //notes route
    app.use("/notes",require("./routes/notes"));


app.listen(5000,()=>{
    console.log("Sever is running on port 5000");
})