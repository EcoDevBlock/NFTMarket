var MyNft = artifacts.require("MyNft");
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0xbb4AB581dCC450793434c2996EfbC5d702F9361d");
    // Additional contracts can be deployed here
};