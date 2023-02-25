const sqlite3 = require('sqlite3').verbose();
const http = require("http");
const host = 'localhost';
const port = 3000;

const requestListener = function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200);
    res.end()
    console.log(req)
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


let db = new sqlite3.Database('./database/users.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
