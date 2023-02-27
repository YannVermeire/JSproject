const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const util = require('node:util');
const app = express()
const http = require("http");
const host = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
const { Database, Statement } = require('sqlite3');
const jsonParser = bodyParser.json()

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next()
})

app.post('/addUser',jsonParser,(req,res)=>{
  addUser(req.body.username,req.body.password).then((value)=>{
    console.log(value)
    res.status(200).send(JSON.stringify(value))
  })
});

app.post('/connectAsUser',jsonParser,(req,res)=>{
  //console.log(req.body)
  res.status(200).send(JSON.stringify({error : connectAsUser(req.body.username,req.body.password)}))
});

http.createServer(app).listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

async function addUser(username,password)
{
  var resp = {
    openError : "",
    runError : "",
    finalizeError : ""
  }
  var data = {
    db : null,
    statement : null,
  }
  var promisedDB = new Promise((resolve,reject)=>{
    var db = new sqlite3.Database('./database/users.db',sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        resp.openError=err.errno
        reject()
      }
      else
      {
        data.db=db
        resolve()
      }
    });
  })
  await promisedDB.then(_=>{
    return new Promise((resolve,reject)=>{
      var statement=data.db.prepare("INSERT into users(username,password) VALUES(?,?)")
      statement.run(username,password,(err)=>{
      if (err) {
        resp.runError=err.errno
        reject(err)
      }
      else
      {
        data.statement=statement
        resolve()
      }
    })
    })
  }).then(_=>
    {
      return new Promise((resolve,reject)=>{
        data.statement.finalize((err)=>{
          if(err)
          {
            resp.finalizeError=err.errno
            reject(err)
          }
          else
          {
            resolve()
          }
        })
      })
    }).then(_=>{
      data.db.close()
    }).catch(err=>{
      console.log(err)
    })
    return resp
}

function connectAsUser(username,password)
{
  var db = new sqlite3.Database('./database/users.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("open error code : "+err.errno+" ; msg : "+err.message);
    }
  });
  var statement=db.prepare("SELECT (username) from users where username=? AND password=?")
  statement.get(username,password,(err,row)=>{
    if(err) 
    {
      console.error("connect error code : "+err.errno+" ; msg : "+err.message);
    }
    return row? console.log("found user :",row.username): console.log("no row with username :",username,"and password :",password)
  })
  statement.finalize((err)=>{
    if(err)
    {
      console.error("finalize error code : "+err.errno+" ; msg : "+err.message);
    }
  })
  db.close()
}