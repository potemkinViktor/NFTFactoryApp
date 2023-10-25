import { useEffect } from "react";
import WagmiProvider from "./WagmiProvider";
import ConnectButton from "./ConnectButton";
import Collections from "./Collections";
import CreateCollection from "./CreateCollection";

const App: React.FC = () => {

  return (
    <WagmiProvider>
      <ConnectButton />
      <Collections />
      <CreateCollection />
    </WagmiProvider>
  );
};

export default App;
