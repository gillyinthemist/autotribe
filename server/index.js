const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = 3001;
const router = require('./router');


//app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

const server = app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`🚀 Server (sessions) is listening on port ${SERVER_PORT}!`);
  }
});
