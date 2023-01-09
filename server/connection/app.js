const contract = require('truffle-contract');
const HelloWorld_Artifact = require('../build/contracts/HelloWorld.json');
const BlueToken_Artifact =  require('../build/contracts/BlueToken.json');
const MyNft_Artifact = require("../build/contracts/MyNft.json")
const HelloWorld = contract(HelloWorld_Artifact);
const BlueToken = contract(BlueToken_Artifact);
const MyNft = contract(MyNft_Artifact)

module.exports = {
    start: function(callback) {
        var self = this;
        HelloWorld.setProvider(self.web3.currentProvider)    

        self.web3.eth.getAccounts(function(err,accs){
            if(err != null){
                console.log("There is an error fetching your accounts")
                return;
            }

            if(accs.length == 0){
                console.log("could not get any accounts! Make sure your eth client is configured properly")
                return;
            }
            self.accounts = accs;
            self.account = self.accounts[2];

            callback(self.accounts)
        })
    },
    mint: async function(_to, callback) {
        const self = this;
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        let accounts =  await self.web3.eth.getAccounts();
        BlueToken.deployed().then(function(instance){
            meta = instance;
            return meta.mint(_to, {from: accounts[0]})
        }).then(isSuccess => {
            if(isSuccess){
                callback("Mined successfully")
            }else{
                callback("Mining failed")
            }
        }).catch(err => {
            console.log(err);
            callback("ERROR: something went wrong")
        })
    },

    signUp: async function(address, username, password, callback) {
        const self = this;
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        let accounts =  await self.web3.eth.getAccounts();
        BlueToken.deployed().then(function(instance){
            meta = instance;
            console.log(`Before registering ${address} ---> ${username} ---> ${password} `)
            return meta.signUp(address, username, password, {from: accounts[0]})
        }).then(isSuccess => {
            if(isSuccess){
                callback("User Registered successfully")
            }else{
                callback("User Registration failed")
            }
        }).catch(err  => {
            console.log(err);
            callback("ERROR: Something went wrong")
        })
    },

    signIn: function(name, callback) {
        const self = this;
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        BlueToken.deployed().then(function(instance){
            meta = instance;
            return meta.signIn(name)
        }).then(resp => {
            const result = {address: resp[0] , balance: resp[1]}
            callback(result)
        }).catch(err => {
            console.log(err)
            callback("Error: something went wrong")
        })
    },

    getContractBalance: function(address, callback) {
        const self = this;
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        BlueToken.deployed().then(function(instance){
            meta = instance;
            return meta.getContractBalance(address)
        }).then(resp => {
            callback(resp)
        }).catch(err => {
            console.log(err)
            callback("Error: something went wrong")
        })
    },

    createProduct: async function(from, owner,name, description, price, callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        let accounts =  await self.web3.eth.getAccounts();
        console.log(`from ${from} owner ${owner} name ${name} description ${description} price ${price}`)
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.safeMint(from, owner,name, description, price, {from: accounts[0]})
        }).then(isSuccess => {
        if(isSuccess){
                callback("Product created successfully")
            }else{
                callback("Product creation failed")
            }
        }).catch(err  => {
            console.log(err);
            callback("ERROR: Something went wrong")
        })
    },

    buyProduct:  async function(owner, _to, indx, val, callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        let accounts =  await self.web3.eth.getAccounts();
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.buyProduct(owner, _to, indx, val, {from: accounts[0]})
        }).then(isSuccess => {
            if(isSuccess){
                    callback("Product Purchased successfully")
                }else{
                    callback("Product Purchase failed")
                }
            }).catch(err  => {
                console.log(err);
                callback("ERROR: Something went wrong")
            })
    },
    getProductByUser: function(owner, callback){
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.getProductByUser(owner)
        }).then(result => {
            callback(result)
        }).catch(err  => {
            console.log(err);
            callback("ERROR: Something went wrong")
        })
    },

    listOfPRoducts: function(callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.listOfPRoducts()
        }).then(result => {
            callback(result)
        }).catch(err => {
            console.log(err)
            callback("ERROR: Something went worng")
        })
    },

    buyProductByTokenId: async function(tokenId, toOwnerAddress, callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        let accounts =  await self.web3.eth.getAccounts();
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.buyProductByTokenId(tokenId, toOwnerAddress, {from: accounts[0]})
        }).then(product => {
            if(product){
                callback(product)
            }else{
                callback("Product Purchase failed")
            }
        }).catch(err => {
            console.log(err)
            callback("ERROR: Something went worng")
        })
    },

    getBalance: function(callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.getBalance()
        }).then(result => {
            callback(result)
        }).catch(err  => {
            console.log(err);
            callback("ERROR: Something went wrong")
        })
    } 
}
