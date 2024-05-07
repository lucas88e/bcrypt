const express = require("express")
const app = express();
const PORT = 3000;
const routes = require("./routes/users.js")
const session = require("express-session")
const middelware = require("./middlewares/authMiddleware.js")
const hashedSecret = require("./crypto/config.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret:hashedSecret,
    resave:false,
    saveUninitialized:true,
    cookie:{secrure:true}
}))
app.get("/",routes);
app.post("/login",routes)
app.get("/dashboard",middelware.verifyToken,routes)
app.post("/logout",routes)
app.get("/home",middelware.verifyToken,routes)

app.listen(PORT,()=>{
    console.log(`El servidor se esta lanzando en el http://localhost:${PORT}`)
  })

