/* eslint-disable @typescript-eslint/no-explicit-any */
// WalletConnector.tsx
import React from "react";
import { useAtom } from "jotai";
import { btcAddressAtom, solanaAddressAtom } from "../stores/wallet";

const WalletConnector: React.FC = () => {
  const [btcAddress, setBtcAddress] = useAtom(btcAddressAtom);
  const [solanaAddress, setSolanaAddress] = useAtom(solanaAddressAtom);

  React.useEffect(() => {
    const storedBtcAddress = localStorage.getItem("btcAddress");
    const storedSolanaAddress = localStorage.getItem("solanaAddress");

    if (storedBtcAddress) {
      setBtcAddress(storedBtcAddress);
    }
    if (storedSolanaAddress) {
      setSolanaAddress(storedSolanaAddress);
    }
  }, [setBtcAddress, setSolanaAddress]);

  const handleProviderError = (provider: any, type: string) => {
    if (!provider) {
      console.error(`No ${type} provider found`);
      return true;
    }
    return false;
  };

  const getBtcProvider = () => {
    if ("phantom" in window) {
      const anyWindow: any = window;
      const provider = anyWindow.phantom?.bitcoin;

      if (provider && provider.isPhantom) {
        return provider;
      }
    }

    return null;
  };

  const getSolanaProvider = () => {
    if ("phantom" in window) {
      const anyWindow: any = window;
      const provider = anyWindow.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    return null;
  };

  const connectBtc = async () => {
    const btcProvider = getBtcProvider();
    if (handleProviderError(btcProvider, "BTC")) return;
    try {
      const accounts = await btcProvider.requestAccounts();
      const address = accounts[0].address;
      setBtcAddress(address);
      localStorage.setItem("btcAddress", address);
    } catch (err) {
      console.error("Failed to connect BTC wallet:", err);
    }
  };

  const connectSolana = async () => {
    const solanaProvider = getSolanaProvider();
    if (handleProviderError(solanaProvider, "Solana")) return;
    try {
      const resp = await solanaProvider.connect();
      const address = resp.publicKey.toString();
      setSolanaAddress(address);
      localStorage.setItem("solanaAddress", address);
    } catch (err) {
      console.error("Failed to connect Solana wallet:", err);
    }
  };

  const connectPhantom = async () => {
    await connectBtc();
    await connectSolana();
  };

  const disconnectBtc = async () => {
    setBtcAddress("");
    localStorage.setItem("btcAddress", "");
    console.log("Disconnected from BTC wallet");
  };

  const disconnectSolana = async () => {
    setSolanaAddress("");
    localStorage.setItem("solanaAddress", "");
    console.log("Disconnected from Solana wallet");
  };

  const disconnectPhantom = async () => {
    await disconnectBtc();
    await disconnectSolana();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={connectPhantom}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Connect Phantom Wallet
      </button>
      <button
        onClick={disconnectPhantom}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        Disconnect Phantom Wallet
      </button>
      {btcAddress && <p className="mt-4">BTC Address: {btcAddress}</p>}
      {solanaAddress && <p className="mt-4">Solana Address: {solanaAddress}</p>}
    </div>
  );
};

export default WalletConnector;
