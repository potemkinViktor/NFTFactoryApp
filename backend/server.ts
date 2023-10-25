import { ethers } from "ethers";
import express from "express";
import { Abi__factory as ContractFactory } from "typechain";
import { AbiCollection__factory as CollectionContractFactory } from "typechain-collection";
import cors from "cors";

type NFT = {
  collection_addess: string;
  collection_minter: string;
  token_id: string;
  token_uri: string;
};

type Collection = {
  name: string;
  symbol: string;
  address: string;
};

const collections: Collection[] = [];
const nfts: NFT[] = [];

const app = express();
app.use(cors());
const port = 3000;

const provider = new ethers.providers.WebSocketProvider(
  "wss://polygon-mumbai.g.alchemy.com/v2/uT747kUZYmny3_vJDtaxPjtzlMPHLn7W"
);
const contract = ContractFactory.connect(
  "0xbE6D2055238275f4A0b098Ff3b8787E2f8a0803C",
  provider
);

contract.on(
  "CollectionCreated",
  (collectionAddress: string, name: string, symbol: string) => {
    collections.push({ name, symbol, address: collectionAddress });

    const collectionContract = CollectionContractFactory.connect(
      collectionAddress,
      provider
    );

    collectionContract.on(
      "TokenMinted",
      (collection: string, recipient: string, tokenld: string, tokenURI: string) => {
        nfts.push({
          collection_addess: collection,
          collection_minter: recipient,
          token_id: tokenld,
          token_uri: tokenURI,
        });
      }
    );
  }
);

app.get("/collections", (_, res) => {
  res.status(200).send(collections);
});

app.get("/nfts", (_, res) => {
  res.status(200).send(nfts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
