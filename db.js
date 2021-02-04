
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cardioappdb', { useNewUrlParser: true , useUnifiedTopology: true})

const pacienteSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  idade: Number,
  email: String
}, { collection: 'pacientecollection' }
);

const userSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  email: String,
  senha: String
}, {collection: 'usercollection'}
);



module.exports = { Mongoose: mongoose, PacienteSchema: pacienteSchema, UserSchema: userSchema}