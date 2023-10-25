import { useEffect, useState } from "react";
import { AbiCollection__factory } from "../typechain-collection";
import { ethers } from "ethers";

type CollectionRowProps = {
  name: string;
  symbol: string;
  address: string;
};

const CollectionRow = ({ address, name, symbol }: CollectionRowProps) => {
  const createNft = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = AbiCollection__factory.connect(
      "0x25fA5aA31623b0d4Fccc4eFFFc94d9faC1eDB42E",
      signer
    );
    const id = window.prompt("Input id");
    const uri = window.prompt("Input uri");

    await (await contract.mint(id!, uri!)).wait();
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{address}</td>
      <td>
        <button onClick={createNft}>create nft</button>
      </td>
    </tr>
  );
};

const Collections: React.FC = () => {
  const [collections, setCollections] = useState<CollectionRowProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>symbol</th>
          <th>address</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {collections.map((collection) => (
          <CollectionRow key={collection.address} {...collection} />
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
};

export default Collections;
