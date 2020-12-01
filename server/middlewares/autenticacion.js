const jwt = require('jsonwebtoken');


//Verificar Token

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'TOKEN NO VALIDO'
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};


//VERIFICA ADMIN ROLE

let verificaAdmin_Role = (req, res, next) => {


    let usuario = req.usuario;
    if (usuario.role === 'USER_ROLE') {

        return res.status(400).json({
            ok: false,
            err: 'NO TIENE PERMISOS SUFICIENTES (NO ES ADMINISTRADOR)'
        })
    }
    next();
}

//VERIFICA TOKEN IMAGEN
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;


    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'TOKEN NO VALIDO'
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}