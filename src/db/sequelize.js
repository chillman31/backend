const { Sequelize, DataTypes } = require('sequelize')
let { pokemons } = require('./pokemons')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize( 'pokedex','root', '', {
        host:'localhost',
        dialect:'mariadb',
        dialectOptions : {
            timezone: 'Etc/GMT-2'
        }, 
        logging:false
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    sequelize.sync({force: true})
    .then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name : pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture:pokemon.picture,
                types: pokemon.types
            })
        })

        bcrypt.hash('pikachu', 10)
            .then(hash => {
                User.create({
                    username: 'Mohamed',
                    password: hash
                })
            })
     })
}

module.exports = {
    initDb, Pokemon, User
}