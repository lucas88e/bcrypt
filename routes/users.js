const express = require('express')
const router = express.Router()
const users= require("../data/users")
const middelware = require("../middlewares/authMiddleware")
router.get("/", (req, res) => {
    const login = `<form action="/login" method = "post">
<label for="username"> Usuario: </label>
<input type="text" id="username" name="username" required><br>
<label for="password">Contaseña</label>
<input type="password" id="password" name="password" required><br>
<p><button type="submit">Iniciar sesión</button></p>
</form>
<a href ="/dashboard">Dashboard</a> 
`
    res.send(login)
})
router.post("/login",(req,res)=>{
    const {username,password}= req.body
    const user = users.find((user)=> user.username ===username && user.password ===password)
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
            res.send("BIENVENIDO");
        }
        else{
            res.status(401).json({mensaje:"No se ha encontrado"})
        }
    
})
module.exports = router;
