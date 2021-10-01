const express = require("express");
const http = require("http");
const cors = require('cors');
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json());
app.use(cors());
const hashKey = 'hellomoto'

const server = http.createServer(app);
server.listen(3000, () => console.log("running in 3000"));

app.post("/login", (req, res) => {
  const { uname, password } = req.body;

  const token = jwt.sign({ uname, password }, hashKey, {
    expiresIn: "2h",
  });
  res.status(200).json({token})
});

app.post('/verify', (req, res)=>{
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, hashKey)
        return res.status(200).send({auth:true})
    } catch(err) {
        return res.status(401).send("Invalid token")
    }
})
