var MyNft = artifacts.require("MyNft");
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0x5CB66792Eb8Bca85a3ef51bf90Ed118bda0a91F6");
    // Additional contracts can be deployed here
};