const { encrypt } = require("../config/encrypt");
const Entrada = require("./entradas.model")
const bcrypt = require("bcrypt");

const newEntrada = async (req, res, next) => {

    try {
        
        const { dni } = req.params;

        /* let newDNI = encrypt(dni); */
        let newDNI = bcrypt.hashSync(dni, 10);

        const newEntrada = new Entrada({
            url: `http://localhost:3000/entradas/${newDNI}`
        });

        newEntrada.save();

        return res.json(newEntrada);

    } catch (error) {
        
    }

}

const getEntrada = async (req, res, next) => {
    try {

        const { dni } = req.params;
        const myEntrada = Entrada.findOne({url: `http://localhost:3000/entradas/${dni}`})

        if (myEntrada) {
            return res.json("puedes pasar")
        } else {
            return res.json("no puedes pasar")
        }

    } catch (error) {
        
    }
}

module.exports = {
    newEntrada,
    getEntrada
}