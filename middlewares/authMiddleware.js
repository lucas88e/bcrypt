
const jwt = require("jsonwebtoken");
const users = require("../data/users")


function generateToken(user) {
    return jwt.sign({ user: user.id }, "secreto", { expiresIn: "1h" })
}

function verifyToken(req, res, next) {

    const token = req.session.token;
    if (!token) {
        return res.status(401).json({ memsaje: "Token no generado correctamente" })
    }
    jwt.verify(token, "secreto", (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: "Token no valido" })
        }
        req.user = decoded.user
        next()
    })
}

module.exports={generateToken,verifyToken}