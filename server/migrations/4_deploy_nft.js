var MyNft = artifacts.require("MyNft");
module.exports = function(deployer) {
    deployer.deploy(MyNft, "0x0fe9bbb0F267800f76Bc68F31F05814146794A7D");
    // Additional contracts can be deployed here
};