import React, { useMemo } from 'react';
import { ConnectionProvider, useConnection, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Keypair } from '@solana/web3.js';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './config/createApolloClient'

import './App.css';
import Admin from './pages/admin/Admin';
import Employee from './pages/employee/Employee';
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ], [network])

  return (
    <ConnectionProvider endpoint={endpoint} >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <ApolloProvider client={client}>
            {/* <Admin /> */}
            <Employee />
          </ApolloProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
