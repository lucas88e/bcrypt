const express = require("express")
const app = express();
const PORT = 3000;
const routes = require("./routes/users")
const session = require("express-session")
const middelware = require("./middlewares/authMiddleware")
// routes.setup(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret:"secreto",
    resave:false,
    saveUninitialized:true,
    cookie:{secrure:true}
}))
app.get("/",routes);
app.post("/login",routes)
app.get("/dashboard",middelware.verifyToken,routes)

app.listen(PORT,()=>{
    console.log(`El servidor se esta lanzando en el http://localhost:${PORT}`)
  })

  