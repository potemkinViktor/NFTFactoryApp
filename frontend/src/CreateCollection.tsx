import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Abi, Abi__factory } from "../typechain";
import { ethers } from "ethers";

const CreateCollection: React.FC = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [collectionContract, setCollectionContract] = useState<Abi | null>(null);
  const { isConnected } = useAccount();
  const [contractInitializated, setContractInitializated] = useState(false);

  const handleSubmit = async () => {
    if (collectionContract) {
      await (await collectionContract.createCollection(name, symbol)).wait();
    }
  };

  console.log({ isConnected, collectionContract });

  useEffect(() => {
    if (isConnected) {
      const ethereum = window?.ethereum as any;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = Abi__factory.connect(
        "0xbE6D2055238275f4A0b098Ff3b8787E2f8a0803C",
        signer
      );
      setCollectionContract(contract);
      setContractInitializated(true);
    }
  }, [isConnected]);

  if (!contractInitializated) return <span>Please connect wallet</span>;
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "flex", flexDirection: "column", width: 200 }}
    >
      <input type="text" onInput={(e) => setName((e.target as any).value)} />
      <input type="text" onInput={(e) => setSymbol((e.target as any).value)} />
      <button onClick={handleSubmit}>Create collection</button>
    </form>
  );
};

export default CreateCollection;
