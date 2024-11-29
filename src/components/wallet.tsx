/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import phantom from "/assets/img/phantom.svg";
import { formatAddress } from "../utils";
import { Popover, Button, Text } from "@radix-ui/themes";
import {
  btcAddressAtom,
  solanaAddressAtom,
  btcAccountAtom,
  BtcAccount,
} from "../stores/wallet";
import { useAtom } from "jotai";
import userSvg from "/assets/img/user.svg";
import btcSvg from "/assets/img/btc.svg";
import solanaSvg from "/assets/img/solana.svg";
import { toast } from "../hooks/use-toast";

const Wallet: React.FC = () => {
  const [btcAddress, setBtcAddress] = useAtom(btcAddressAtom);
  const [btcAccount, setBtcAccount] = useAtom(btcAccountAtom);
  const [solanaAddress, setSolanaAddress] = useAtom(solanaAddressAtom);

  useEffect(() => {
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
      toast({ description: `No ${type} provider found` });
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
      const firstAccount = accounts[0];
      // Request signature
      // const message = new TextEncoder().encode(
      //   "Please sign this message to connect your wallet."
      // );
      // await btcProvider.signMessage(address, message);
      setBtcAddress(address);
      setBtcAccount(firstAccount);

      console.log("====btcAccount after set", btcAccount);
      localStorage.setItem("btcAddress", address);
    } catch (err) {
      toast({ description: `Failed to connect BTC wallet:${err}` });
    }
  };

  const connectSolana = async () => {
    const solanaProvider = getSolanaProvider();
    if (handleProviderError(solanaProvider, "Solana")) return;
    try {
      const resp = await solanaProvider.connect();
      const address = resp.publicKey.toString();
      // Request signature btcAccount

      if (btcAccount) {
        const jsonStr = JSON.stringify(btcAccount);
        const message = new TextEncoder().encode(jsonStr);
        const { signature } = await solanaProvider.signMessage(message, "utf8");
        console.log("signature", signature);
      } else {
        toast({ description: `btcAccount is not available for signing` });
      }
      setSolanaAddress(address);
      localStorage.setItem("solanaAddress", address);
      // console.log(address);
    } catch (err) {
      toast({ description: `Failed to connect Solana wallet:${err}` });
    }
  };

  const connectPhantom = async () => {
    await connectBtc();
    await connectSolana();
  };

  const disconnectBtc = async () => {
    setBtcAccount({} as BtcAccount);
    setBtcAddress("");
    localStorage.setItem("btcAddress", "");
    console.log("Disconnected from BTC wallet");
  };

  const disconnectSolana = async () => {
    const solanaProvider = getSolanaProvider();
    solanaProvider.disconnect();
    setSolanaAddress("");
    localStorage.setItem("solanaAddress", "");
    console.log("Disconnected from Solana wallet");
  };

  const disconnectPhantom = async () => {
    await disconnectBtc();
    await disconnectSolana();
  };

  return (
    <>
      {solanaAddress && btcAddress ? (
        <div className="flex flex-col items-center">
          <Popover.Root>
            <Popover.Trigger>
              <img
                src={userSvg}
                alt="user"
                className="rounded-full size-6 cursor-pointer bg-white"
              />
            </Popover.Trigger>
            <Popover.Content size="1" maxWidth="300px">
              <div className="flex flex-col gap-1 ">
                <div className="flex justify-center items-center gap-1 font-pixel">
                  <img src={btcSvg} alt="btc" className="rounded-full size-5" />
                  <Text className="text-sm">{formatAddress(btcAddress)}</Text>
                </div>

                <div className="flex justify-center items-center gap-1 font-pixel">
                  <img
                    src={solanaSvg}
                    alt="solana"
                    className="rounded-full size-4"
                  />
                  <Text className="text-sm">
                    {formatAddress(solanaAddress)}
                  </Text>
                </div>

                <Button
                  variant="ghost"
                  onClick={disconnectPhantom}
                  className={`text-darkYellow ring-0 outline-none cursor-pointer font-pixel`}
                >
                  Disconnect
                </Button>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      ) : (
        <div onClick={connectPhantom} className=" transition">
          <img
            src={phantom}
            alt="phantom"
            className="rounded-full size-6 cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default Wallet;
