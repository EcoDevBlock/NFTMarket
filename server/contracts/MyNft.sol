// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNft is ERC721, Ownable {
    using Counters for Counters.Counter;
    IERC20 public tokenAddress;

    struct Product {
        string name;
        string description;
        address owner;
        uint256 price;
    }

    mapping(uint256 => address[]) OwnerList;

    mapping(uint256 => Product) MintedNFT;

    Counters.Counter private _tokenIdCounter;

    constructor(address _tokenAddress) ERC721("MyNft", "MTX") {
        tokenAddress = IERC20(_tokenAddress);
    }

    function safeMint(
        address _from,
        string memory _name,
        string memory _description,
        uint256 _price
    ) public returns (bool) {
        Product memory product = Product({
            name: _name,
            description: _description,
            price: _price,
            owner: _from
        });
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(_from, tokenId);
        MintedNFT[tokenId] = product;
        OwnerList[tokenId].push(_from);
        return true;
    }

    function setProductPrice(uint256 _tokenId, uint256 val)
        external
        returns (bool)
    {
        Product storage product = MintedNFT[_tokenId];
        product.price = val * (10**18);
        return true;
    }

    function getProductByTokenId(uint256 _tokenId)
        external
        view
        returns (Product memory)
    {
        return MintedNFT[_tokenId];
    }

    function buyProductByTokenId(
        uint256 _tokenId,
        address _toownerAddress,
        address _fromownerAddress
    ) external returns (Product memory) {
        Product memory product = MintedNFT[_tokenId];
        tokenAddress.transferFrom(
            _toownerAddress,
            product.owner,
            product.price
        );
        require(product.owner == _fromownerAddress, "Incorrent From owner");
        product.owner = _toownerAddress;
        MintedNFT[_tokenId] = product;
        OwnerList[_tokenId].push(_toownerAddress);
        return product;
    }

    function getOwnerHistoryByTokenId(uint256 _tokenId)
        public
        view
        returns (address[] memory)
    {
        return OwnerList[_tokenId];
    }

    function getBalance() external view returns (uint256) {
        return tokenAddress.balanceOf(address(this));
    }

    function getTotalNFTMinted() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
