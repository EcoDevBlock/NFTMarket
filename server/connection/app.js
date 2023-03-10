const contract = require('truffle-contract');
require('dotenv').config();
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
    mint: async function(_to, _amount, callback) {
        const self = this;
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        BlueToken.deployed().then(function(instance){
            meta = instance;
            meta.sendTransaction({from: _to, value: _amount}).then(isSuccess => {
                if(isSuccess){
                     meta.mint(_to, _amount, {from: _to}).then(isMintSuccessfull => {
                        if(isMintSuccessfull){
                            callback("Minted susscessfully")
                        }else{
                            callback("Mint unsuccessfull")
                        }
                     }).catch(err => {
                        console.log(err)
                        callback("Error: Something went wrong")
                     })
                }else {
                    callback("Error: sending ethers to Token Contract unsuccessfull")
                }

            }).catch(err => {
                console.log(err)
                callback("Error: something went wrong in sending ethers to Token Contract")
            })
            
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

    getTokenBalance: function(address, callback) {
        const self = this;
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        BlueToken.deployed().then(function(instance){
            meta = instance;
            return meta.getTokenBalance(address)
        }).then(resp => {
            callback(resp)
        }).catch(err => {
            console.log(err)
            callback("Error: something went wrong")
        })
    },

    createProduct: async function(from,name, description, price, callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        let accounts =  await self.web3.eth.getAccounts();
       // console.log(`from ${from} owner ${owner} name ${name} description ${description} price ${price}`)
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.safeMint(from,name, description, price, {from: accounts[0]})
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

    listOfProducts: async function(callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        let products = [];
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.getTotalNFTMinted()
        }).then(async function(totalcount) {
            console.log(`total NFT Minted: ${totalcount}`)
            for(let i = 1; i <= totalcount; i++){
                const product = await meta.getProductByTokenId(i);
                const prd = {"title": product[0], "description": product[1], "ownerAddress": product[2], "price": product[3], "tokenid": product[4]}
                products.push(prd)
            }
            callback(products)
        }).catch(err => {
            console.log(err)
            callback("ERROR: Something went worng")
        })
    },

    buyProductByTokenId: async function(tokenId, toOwnerAddress, fromOwnerAddress, amount, callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        BlueToken.setProvider(self.web3.currentProvider);
        let meta;
        // let accounts =  await self.web3.eth.getAccounts();
        BlueToken.deployed().then(function(instance){
            return instance.approve(process.env.CONTRACT_MYNFT, amount, {from: toOwnerAddress})
        }).then(isSuccess => {
            if(isSuccess) {
                console.log("Approval is successfull")
                MyNft.deployed().then(function(instance){
                    meta = instance;
                    return meta.buyProductByTokenId(tokenId, toOwnerAddress, fromOwnerAddress, {from: toOwnerAddress})
                }).then(product => {
                    if(product){
                        console.log("Product purchase is successfull");
                        meta.transferFrom(fromOwnerAddress,toOwnerAddress, tokenId, {from: fromOwnerAddress}).then( response => {
                            if(response) {
                                console.log("Product ownership transfered successfully!")
                                callback(response)
                            }else {
                                console.log("error in ownership transfet")
                            }
                        }).catch(err => {
                            console.log("Error: Something went wront NFT ownership transfer");
                            console.log(err)
                        })
                    }else{
                        callback("Product Purchase failed")
                    }
                }).catch(err => {
                    console.log(err)
                    callback("ERROR: Something went worng in purchase")
                })
            }
        }).catch(err => {
            console.log(err)
            callback("ERROR: Something went wrong in approval")
        }) 
    },
    getOwnerHistoryByTokenId: function(tokenid, callback) {
        const self = this;
        MyNft.setProvider(self.web3.currentProvider);
        let meta;
        MyNft.deployed().then(function(instance){
            meta = instance;
            return meta.getOwnerHistoryByTokenId(tokenid)
        }).then(function(response){
            callback(response)
        }).catch(function(err){
            console.log(err);
            callback("Error: something went wrong")
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
