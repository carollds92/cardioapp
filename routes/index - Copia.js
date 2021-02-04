
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*GET pagina de pacientes.ejs- ele tras os resultados */
router.get('/pacientes', function(req, res) {
const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
const db = require("../db");
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
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  const db = require("../db");
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const idade = parseInt(req.body.idade);
  const email = req.body.email;
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

//site https://tableless.com.br/crud-nodejs-mongodb-express-mongoo-kinghost-hospedagem/

router.get('/edit', function(req, res, next) {  
  res.render('edit');  
});  

router.post('/edit', function(req, res, next) {  
  const Pacientes = db.Mongoose.model('pacientecollection', db.PacienteSchema, 'pacientecollection');
  const db = require("../db");  
  const id = req.params.id;  
  Pacientes.findById(id, function(err, doc) {  
    if (err) {
      console.log("Error! " + err.message);
      return err;
    }else { 
      doc.req.body.nome;
      doc.req.body.sobrenome;
      doc.req.body.idade;
      doc.req.body.email;
      doc.save(); 
    } 
  })  
  res.redirect('/pacientes');  
});  

router.get('/delete', function(req, res, next) {  
  res.render('delete');  
});  

router.post('/delete', function(req, res, next) {  
  const id = req.params.id;  
  Pacientes.findByIdAndRemove(id).exec();  
  res.redirect('/pacientes');  
});


module.exports = router;
