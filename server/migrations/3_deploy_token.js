var BlueToken = artifacts.require("BlueToken");
module.exports = function(deployer) {
    deployer.deploy(BlueToken);
    // Additional contracts can be deployed here
};