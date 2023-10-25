import { useAccount, useConnect } from "wagmi";

const ConnectButton: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { connectAsync, connectors } = useConnect();

  const handleConnect = async () => {
    const connectResp = await connectAsync({ connector: connectors[0] });
    console.log({ connectResp });
  };

  return <button onClick={handleConnect}>{isConnected ? address : "Connect"}</button>;
};

export default ConnectButton;
