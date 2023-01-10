var MyNft = artifacts.require("MyNft");
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0x39c3a22EF7d00742FA7A60B1A49e13a80781a212");
    // Additional contracts can be deployed here
};