const { response, request } = require('express');

const userGET = (req = request, res = response) => {

    //Tambien con la desestructuración pordemos pasarle valores por default
    const { query, apiKey = 'a4d8w', id } = req.query; //Recibimos los query que le mandamos por la ruta y desestructuramos para tener control sobre lo que recibimos

    res.status(200).json({
        msg: 'Get API',
        query,
        apiKey,
        id
    })
}

const userPUT = (req = request, res = response) => {

    const { id } = req.params //Recibimos el parametro que le mandamos por la ruta

    res.status(201).json({
        msg: 'Put API',
        id: id
    })
}

const userPOST = (req = request, res = response) => {

    const { id, nombre, saldo } = req.body; //Desestructurar aqui es util porque podemos recibir solo lo que nos interese, el resto lo va a ignorar


    res.status(201).json({
        msg: 'Post API',
        id,
        nombre,
        saldo
    })
}

const userDELETE = (req, res = response) => {
    res.status(200).json({
        msg: 'Delete API'
    })
}

module.exports = {
    userGET,
    userPUT,
    userPOST,
    userDELETE
}