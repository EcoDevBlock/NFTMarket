// var HelloWorld = artifacts.require("HelloWorld");
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/getAccounts', (req, res) => {
    console.log("**** GET /getAccounts ****");
    truffle_connect.start(function (answer) {
      res.send(answer);
    })
})
,

app.post("/register", async (req,res) => {
    const {name, password} = req.body
    const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"))
    const account = await web3.eth.accounts.create(name);
    console.log(account)
    truffle_connect.signUp(account.address, name, password, (answer) => {
        res.send(answer)
    })

})

app.post("/mint", (req,res) => {
    const {addr} = req.body;
    truffle_connect.mint(addr, (answer) => {
        res.send(answer)
    })
})

app.post("/token/balance", (req,res) => {
    const {address} = req.body;
    truffle_connect.getContractBalance(address, (answer) => {
        res.send(answer);
    })
})


app.post("/product/create", async (req, res) => {
   const {from, owner, name, description, price} =  req.body;
   truffle_connect.createProduct(from, owner,name, description, price, (answer) => {
        res.send(answer)
   })

})

app.post("/product/purchase", async (req,res) => {
    const {tokenId, buyerAddress} = req.body;
    truffle_connect.buyProductByTokenId(tokenId, buyerAddress, (answer) => {
        res.send(answer);
    })
})

app.post("/product/list", async (req,res) => {
    const {owner} = req.body
    truffle_connect.getProductByUser(owner, (answer) => {
        res.send(answer);
    })
})

app.get("/product/all", (req,res) => {
    truffle_connect.listOfPRoducts(response => {
        res.send(response)
    })
})

app.get("/nft/balance", (req,res) => {
    truffle_connect.getBalance((answer) => {
        res.send(answer);
    })
})

app.post("/login", (req,res) => {
    const {name} = req.body;
    truffle_connect.signIn(name, answer => {
        res.send(answer)
    })
})

app.listen(port, () => {
    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    console.log("Express Listening at http://localhost:" + port);
});