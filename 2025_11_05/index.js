const express = require('express')
const path = require('path')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'messages',
});

const app = express()

app.use(express.static(path.join(__dirname, '/static')));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/sites/strona_glowna.html');
})

app.get('/o-nas', (req, res) => {
  res.status(200).sendFile(__dirname + '/sites/o-nas.html');
})

app.get('/oferta', (req, res) => {
  res.status(200).sendFile(__dirname + '/sites/oferta.html');
})

app.get('/kontakt', (req, res) => {
  res.status(200).sendFile(__dirname + '/sites/kontakt.html');
})

app.post('/kontakt', (req, res) => {
  const data = req.body;
  console.log(data);
  connection.execute(
    'INSERT INTO messages(Imie, Nazwisko, Email, Wiadomosc) VALUES (?, ?, ?, ?)',
    [data.imie, data.nazwisko, data.email, data.wiadomosc],
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  )
  res.status(302).redirect('/');
})

app.get('/api/contact-messages', (req, res) => {
  connection.execute('SELECT * FROM messages',
    function (err, results) {
    if (err) {
      console.log(err);
    }
    else{
      res.status(200).json(results);
    }
    })
})

app.get('/api/contact-messages/:id', (req, res) => {
  connection.execute('SELECT * FROM messages WHERE ID = ?',
    [req.params.id],
    function (err, results) {
      if (err) {
        console.log(err);
      }
      else{
        if(results.length == 0){
          res.status(404).json({'Given ID': "Not found"})
        }
        else{
          res.status(200).json(results);
        }
      }
    }
  );
})

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})
