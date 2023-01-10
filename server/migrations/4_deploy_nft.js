var MyNft = artifacts.require("MyNft");
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0x0b95d9EB524e6Ef843518e07cc13E21FA54c2363");
    // Additional contracts can be deployed here
};