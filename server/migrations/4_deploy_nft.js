var MyNft = artifacts.require("MyNft");
require("dotenv").config()
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0x90Ce6093fd4876865c491E05A5E8F1672AfcF989");
    // Additional contracts can be deployed here
};