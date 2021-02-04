
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET tela inicial . */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

/* GET login. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* GET esqueceu a senha. */
router.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password');
});
/* GET novo cadastro medico. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
/*POST função /adduser */
router.post('/adduser', function (req, res) {
  const db = require("../db");
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const email = req.body.email;
  const senha = req.body.senha;
  const User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  const user = new User({ nome: nome, sobrenome: sobrenome, email: email, senha: senha });
    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("dashboard");
        }
    });
});

/*GET pagina de pacientes.ejs- ele tras os resultados */
router.get('/pacientes', function(req, res) {
  const db = require("../db");
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  Pacientes.find({}).lean().exec(
      function (err, docs) {
        if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
        res.render('pacientes', { "pacientes": docs });
      }
   });
});

/*GET pagina new-paciente.ejs*/
router.get('/new-paciente', function(req, res) {
  res.render('new-paciente');
});

/*POST função /addpc */
router.post('/addpc', function (req, res) {
  const db = require("../db");
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const idade = parseInt(req.body.idade);
  const email = req.body.email;
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  const pc = new Pacientes({ nome: nome, sobrenome: sobrenome, idade: idade, email: email });
    pc.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("pacientes");
        }
    });
});
 /*GET pagina de atualização cadastro de paciente*/
router.get('/up-paciente/:id', function(req, res, next) {
  const db = require("../db"); 
  const id = req.params.id;
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  Pacientes.findById(id, (e, docs) => {
    const { nome, sobrenome, idade, email} = docs;
    if(e) { return console.log(e); }
      res.render('up-paciente', {id, nome, sobrenome, idade, email});
    });
})

/*POST update de cadastro de paciente*/
router.post('/edit/:id', function(req, res) {
  const db = require("../db");
  const id = req.params.id;  
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const idade = parseInt(req.body.idade);
  const email = req.body.email;
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  Pacientes.findByIdAndUpdate(id, {nome, sobrenome, idade, email}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/pacientes');
    });
});

/*GET de exclusão do cadastro do paciente*/
router.get('/delete/:id', function(req, res) {
  const db = require("../db");  
  const id = req.params.id;  
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  Pacientes.findByIdAndDelete(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/pacientes');
      });
});


module.exports = router;
