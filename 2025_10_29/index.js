const express = require('express')
const path = require('path')

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
  console.log(req.body);
  res.status(302).redirect('/');
})

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})
