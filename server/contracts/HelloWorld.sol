// SPDX-LICENSE-Identifier: MIT

pragma solidity ^0.8.0;

contract HelloWorld {
    string public message;
    constructor(string memory _message) {
        message = _message;
    }

    function setHelloMessage(string memory _message) public returns (string memory){
        message = _message;
        return(message);
    }

    function getMessage() public view returns (string memory){
        return message;
    }
}