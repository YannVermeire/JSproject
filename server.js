const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const bcrypt = require('bcrypt');
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
    res.status(200).send(JSON.stringify(value))
  })
});

app.post('/connectAsUser',jsonParser,(req,res)=>{
  connectAsUser(req.body.username,req.body.password).then((value)=>{
    res.status(200).send(JSON.stringify(value))
  })
});

app.post('/updateDeck',jsonParser,(req,res)=>{
  updateDeck(req.body.username,req.body.deck).then((value)=>{
    res.status(200).send(JSON.stringify(value))
  })
})

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
    hash : null
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
      bcrypt.hash(password, 10, (err,hash)=>{
        // Store hash in your password DB.
        if(err)
        {
          console.log("error in hashing")
          reject()
        }
        else
        {
          data.hash=hash
          resolve()
        }
    });
    })
  }).then(_=>{
    return new Promise((resolve,reject)=>{
      var statement=data.db.prepare("INSERT into users(username,password) VALUES(?,?)")
      statement.run(username,data.hash,(err)=>{
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

async function connectAsUser(username,password)
{
  
  var data={
    db : null,
    statement : null,
  }
  var resp={
    username : null,
    deck : null,
  }
  var promisedDB = new Promise((resolve,reject)=>{
    var db = new sqlite3.Database('./database/users.db',sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("open error code : "+err.errno+" ; msg : "+err.message);
        reject()
      }
      else
      {
        data.db=db
        resolve()
      }
    });
  });
  await promisedDB.then(_=>{
    return new Promise((resolve,reject)=>{
      var statement=data.db.prepare("SELECT username,password,deck FROM users where username=?;")
      statement.get(username,(err,row)=>{
        if(err) 
        {
          console.log("connect error code : "+err.errno+" ; msg : "+err.message);
          reject()
        }
        else
        {
          data.statement=statement
          if (row)
          {
            bcrypt.compare(password, row.password, (err, result)=>{
              if(err)
              {
                reject()
              }
              else
              {
                if (result)
                {
                  resp.deck=row.deck
                  resp.username=row.username
                }
                else
                {
                  console.log("no account with username :",username,"and password :",password)
                }
                resolve()
              }
          });
          }
        }
      })
    })
  }).then(_=>{
    return new Promise((resolve,reject)=>{
      data.statement.finalize((err)=>{
        if(err)
        {
          console.log("finalize error code : "+err.errno+" ; msg : "+err.message);
          reject()
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

async function updateDeck(username,deck)
{
  var data={
    db:null,
    statement:null
  }
  var resp={
    error :null
  }
  var promisedDB = new Promise((resolve,reject)=>{
    var db = new sqlite3.Database('./database/users.db',sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log("open error code : "+err.errno+" ; msg : "+err.message);
        reject()
      }
      else
      {
        data.db=db
        resolve()
      }
    });
  });
  await promisedDB.then(_=>{
    return new Promise((resolve,reject)=>{
      var statement=data.db.prepare("UPDATE users SET deck=json(?) WHERE username=(?)")
      statement.run(JSON.stringify(deck),username,(err)=>{
        if(err)
        {
          console.log("run error code : "+err.errno+" ; msg : "+err.message)
          reject()
        }
        else
        {
          data.statement=statement
          resolve()
        }
      })
    })
  }).then(_=>{
    return new Promise((resolve,reject)=>{
      data.statement.finalize((err)=>{
        if(err)
        {
          console.log("finalize error code : "+err.errno+" ; msg : "+err.message);
          reject()
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
    resp.error=err
    console.log(err)
  })
  return resp
}