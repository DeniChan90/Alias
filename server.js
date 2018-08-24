const express = require('express')
const fs = require('fs')
const path = require('path');
const app = express();
const port = 8000;

app.get('/api/get_word', (request, response) => {
  fs.readFile('./words.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    let randNum;

    data = data.split('\r');
    randNum = Math.floor(Math.random() * data.length);
    response.send(data[randNum])
  });
})

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
