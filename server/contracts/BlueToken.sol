// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlueToken is ERC20 {
    address payable public owner;

    struct UserDetail {
        address addr;
        string name;
        string password;
        uint256 balance;
    }

    mapping(string => UserDetail) user;
    mapping(address => uint256) balances;

    constructor() ERC20("BlueToken", "BTK") {
        _mint(msg.sender, 10 * (10**decimals()));
        owner = payable(msg.sender);
    }

    function mint(address _to) public returns (bool) {
        _mint(_to, 10 * (10**decimals()));
        return true;
    }

    function signUp(
        address _addr,
        string memory _name,
        string memory _password
    ) external returns (bool) {
        require(user[_name].addr == address(0), "User already exsists");
        user[_name].addr = _addr;
        user[_name].name = _name;
        user[_name].password = _password;
        _mint(_addr, 1 * (10**decimals()));
        balances[_addr] = balances[_addr] + (1 * (10**decimals()));
        return true;
    }

    function signIn(string memory _name)
        external
        view
        returns (address, uint256)
    {
        require(user[_name].addr != address(0), "User Not exsists");
        return (user[_name].addr, balanceOf(user[_name].addr));
    }

    function getContractBalance(address userAddress)
        public
        view
        returns (uint256)
    {
        return balanceOf(userAddress);
    }

    function transferFrom(
        address _owner,
        address _buyer,
        uint256 numTokens
    ) public virtual override returns (bool) {
        uint256 val = numTokens * (10**18);
        balances[_owner] -= val;
        balances[_buyer] += val;
        return true;
    }

    function transfer(
        address _from,
        address _to,
        uint256 val
    ) public returns (bool) {
        _transfer(_from, _to, val);
        return true;
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
