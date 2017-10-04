const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const request = require('request');
const app = express();
let apiRoutes = express.Router();

apiRoutes.use((req, res, next) => { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods",  "*");
res.header("Access-Control-Allow-Origin", "http://localhost");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

apiRoutes.use(bodyParser.json());

app.use('/api', apiRoutes);
// API file for interacting with MongoDB
// const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
// app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


apiRoutes.get('/getSearch', (req, res) => { // получаем запрос
   // 4033e9204033e920406e50337340612122440334033e920189808ef9aa4f4e57a7694da
  //6230014f6230014f62158a6674626aaaf4662306230014f3ae3c1d8026399365abcbffb
  console.log(req.query);
  console.log('https://api.vk.com/method/newsfeed.search?q=%23' + req.query.searchWord + '&access_token=6230014f6230014f62158a6674626aaaf4662306230014f3ae3c1d8026399365abcbffb&count=10&v=5.68');
  request.get('https://api.vk.com/method/newsfeed.search?q=%23' + req.query.searchWord + '&access_token=6230014f6230014f62158a6674626aaaf4662306230014f3ae3c1d8026399365abcbffb&count=10&v=5.68'
    ,(error,response,body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
      else {
        res.send({success: false, msg: error});
      }


  });
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
