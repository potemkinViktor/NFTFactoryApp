import { ReactNode } from "react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

type WagmiProviderProps = { children: ReactNode };

const WagmiProvider = ({ children }: WagmiProviderProps) => {
  const metamaskConnector = new MetaMaskConnector();

  const { provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    connectors: [metamaskConnector],
    webSocketProvider,
  });

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default WagmiProvider;
