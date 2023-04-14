const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

let intialPath = path.join(__dirname, "../docs");
console.log(intialPath);

app.use(bodyParser.json());
app.use(express.static(intialPath));
app.listen(3000, (req, res) => { console.log('listening on port 3000......') })

// Router
app.get('/', (req, res) => { res.sendFile(path.join(intialPath, "index.html")); })
