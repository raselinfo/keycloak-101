var express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();

app.use(
  cors({
    origin: ["http://localhost:8000","http://localhost:8180"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak(
  // { store: memoryStore },
  {},
  {
    "client-id":"mydemo",
    realm: "demo",
    // "bearer-only": true,
    "auth-server-url": "http://localhost:8180/auth",
    "ssl-required": "external",
  //   resource: "mydemo",
  //   secret: "201b2f63-0ed7-4a35-9f4a-5c433c328b72",
  //   realmPublicKey:
  //     "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4HB3LEon3djpnjgIGUYyfTF1Z3Fe7HqMDZXoZzmI3YLRguuQCOc7pCuacqr20nIzCYyUQ/EyGyXzAZ+wKluOzXULPT9VitV15086gJmsen1Nn8+MzqPqFrVpollldHe5qCEMm1GQa1VjU7xZlQvKX0t03yL84Ps8mauvmdZ1qn5lUc9CBQRQLFeWx2vk7Ivsn83Ukx6/wG9QZ6x//0eJJnJe7gHs/WEIy+v0hDqYBlbNStSptB4m8Ht0dH8HcbetTxrVjcSRpscNWgrgns6f7f/w4+HkkmKeD0yf3ZR2GKhQRnb1fvvjdvaSQFFDKt5ko/goptrhX53WwjebrmYLOQIDAQAB",
  //   "client-id": "mydemo",
  }
);

app.use(keycloak.middleware());

app.get("/secured", keycloak.protect("realm:myrole"), function (req, res) {
// app.get("/secured",  function (req, res) {
  console.log(req.headers)
  console.log(keycloak)
  res.setHeader("content-type", "text/plain");
  res.send("Secret message!");
});

app.get('/public', function (req, res) {
  console.log(req.header)
  res.setHeader('content-type', 'text/plain');
  res.send('Public message!');
});

app.get('/', function (req, res) {
  res.send('<html><body><ul><li><a href="/public">Public endpoint</a></li><li><a href="/secured">Secured endpoint</a></li></ul></body></html>');
});

app.listen(3000, function (err) {
  console.log('Started at port 3000');
  console.log(err)
});