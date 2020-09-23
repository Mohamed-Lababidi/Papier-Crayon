// const form = require('./form')
const landing = require('./landing')
const login = require('./authentification/login')
const profile = require('./profile')
const register = require('./authentification/register')
const chat = require('./Chat')
const bio = require('./bio')

module.exports = { login, register, landing, profile, chat, bio }
