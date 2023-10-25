// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC721, ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721Item is ERC721URIStorage {

    event TokenMinted(address collection, address recipient, uint256 tokenld, string tokenURI);

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function mint(uint256 _tokenId, string memory _tokenURI) external {
        _mint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        emit TokenMinted(address(this), msg.sender, _tokenId, _tokenURI);
    }
}