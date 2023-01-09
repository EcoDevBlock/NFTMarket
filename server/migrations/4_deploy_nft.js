var MyNft = artifacts.require("MyNft");
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0x93752D37df84c2489549F217f4F6b8ea6A73bA60");
    // Additional contracts can be deployed here
};