const express = require('express');

const _ = require('underscore');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

let Producto = require('../models/producto');

//OBTENER PRODUCTOS

app.get('/producto', (req, res) => {

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Producto.find({ disponible: true })
        .sort('nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .limit(limite)
        .exec((err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                producto
            });
        });

});

//OBTENER PRODUCTO POR ID

app.get('/producto/:id', (req, res) => {
    let id = req.params.id;
    Producto.findById(id, (err, produtoID) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                produto: produtoID
            })
        })
        .sort('nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')

});

//CREAR UN PRODUCTO

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                productos
            });
        });

});

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let produto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        disponible: body.disponible,
        img: body.img,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    produto.save((err, produtoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!produtoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            produto: produtoDB
        })


    });

});

//ACTUALIZAR UN PRODUCTO

app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', ' disponible']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            produto: productoDB
        });
    });
});

//BORRAR UN PRODUCTO

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let cambiaDisponibilidad = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, cambiaDisponibilidad, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }
        res.json({
            oh: true,
            productoBorrado
        })
    });
});


module.exports = app;