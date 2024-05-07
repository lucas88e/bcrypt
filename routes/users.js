const express = require('express')
const router = express.Router()
const users= require("../data/users.js")
const middelware = require("../middlewares/authMiddleware.js")

router.get("/", (req, res) => {
    
       // if(!req.session.token){  res.send(`<form action="/logout" method ="post">
    // <h2>Sesion iniciada </h2>
    // <button type="submit"> Cerrar sesion</button>
    // <p><a href ="/dashboard"> Dashboard</a></p>`)}
    let login = `<h1>BCRYPT</h1><form action="/login" method = "post">
    
<label for="username"> Usuario: </label>
<input type="text" id="username" name="username" required><br>
<label for="password">Contaseña</label>
<input type="password" id="password" name="password" required><br>
<p><button type="submit">Iniciar sesión</button></p>
</form>
<a href ="/dashboard">Dashboard</a> `;

    res.send(login)
})
router.post("/login",(req,res)=>{
    const {username,password}= req.body
    const user = users.find((user)=> user.username ===username && user.password ===password) //Find siempre determina true o false
    if(user){
        const token = middelware.generateToken(user)
        req.session.token = token
        res.redirect("/dashboard")
    }else{
        res.status(401).json({mensaje:"No se ha encontrado el token"})
    }
   

})

router.get("/dashboard",(req,res)=>{
    const userId = req.user
    const user = users.find(user=> user.id ===userId)
        if(user){
            res.send(`<h1>BIENVENIDO ${user.name}</h1>
            <p> ID: ${user.id}</p>
            <p> Username: ${user.name}</p>
           
            <p><a href ="/home"> HOME</a></p>
            `);
        }
        else{
            res.status(404).json({mensaje: "No se puede encontrar el usuario"})
           
        }
    
})
router.get("/home",(req,res)=>{
    
    res.send(`<form action="/logout" method ="post">
    <h2>Sesion iniciada </h2>
    <button type="submit"> Cerrar sesion</button>
    <p><a href ="/dashboard"> Dashboard</a></p>`)
})
router.post("/logout",(req,res)=>{
req.session.destroy();
res.redirect("/")

})
module.exports = router;
