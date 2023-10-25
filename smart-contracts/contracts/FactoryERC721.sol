// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC721Item} from "./ERC721Item.sol";

contract FactoryERC721 {

    uint256 public collectionsCounter;

    mapping(uint256 => address) public collections;

    event CollectionCreated(address collection, string name, string symbol);

    function createCollection(string memory name_, string memory symbol_)  public {
        ERC721Item _collection = new ERC721Item(name_, symbol_);
        collectionsCounter++;
        collections[collectionsCounter] = address(_collection);

        emit CollectionCreated(address(_collection), name_, symbol_);
    }
}