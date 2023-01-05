// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MyNft is ERC721, Ownable {
    using Counters for Counters.Counter;
    IERC20 public tokenAddress;

    struct Product{
        string name;
        string description;
        address owner;
        uint price;
    }

    mapping(string => Product[]) OwnerList;

    Counters.Counter private _tokenIdCounter;
    
    constructor(address _tokenAddress) ERC721("MyNft", "MTX") {
        tokenAddress = IERC20(_tokenAddress);
    }

    function safeMint(address _from,string memory _owner, string memory _name, string memory _description, uint256 _price) public returns (bool){
        
        // tokenAddress.transferFrom(_from, address(this), _price * (10 ** 18));
        // tokenAddress.allowance(_from, address(this));
        // tokenAddress.approve(_from, 6 * (10 ** 18));
        tokenAddress.transfer(_from, _price * (10 ** 18));
        Product memory product = Product({name: _name, description: _description, price: _price, owner: _from});
        OwnerList[_owner].push(product);
        _tokenIdCounter.increment();
        _safeMint(_from, 1);
        return true;
    }

    function buyProduct(string memory owner, address _to, uint256 indx, uint256 val) external returns (bool) {
        Product storage product = OwnerList[owner][indx];
        require(product.price <= val, "Insufficient amount");
        product.owner = _to;
        tokenAddress.transfer(_to, val * (10 ** 18));
        return true;
    }

    function setProductPrice(string memory owner, uint256 indx, uint256 val) external returns (bool){
        Product storage product = OwnerList[owner][indx];
        product.price = val * (10 ** 18);
        return true;
    }

    function getProductByUser(string memory _owner) external view returns (Product[] memory) {
        return OwnerList[_owner];
    }
}