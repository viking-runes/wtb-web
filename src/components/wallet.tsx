/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import phantom from "/assets/img/phantom.svg";
import { formatAddress } from "../utils";
import { Popover, Button, Text } from "@radix-ui/themes";
import { BtcAccount, useWallet } from "../stores/wallet";
import userSvg from "/assets/img/user.svg";
import btcSvg from "/assets/img/btc.svg";
import solanaSvg from "/assets/img/solana.svg";
import { toast } from "../hooks/use-toast";
import services from "../service";
import { Buffer } from "buffer";
import { useHolders } from "../stores/holders";

const Wallet: React.FC = () => {
  const { btcAddress, setBtcAddress, solanaAddress, setSolanaAddress } =
    useWallet();
  const { resetHolders } = useHolders();

  useEffect(() => {
    const storedBtcAddress = localStorage.getItem("btcAddress");
    if (storedBtcAddress && storedBtcAddress !== btcAddress) {
      setBtcAddress(storedBtcAddress);
    }

    const storedSolanaAddress = localStorage.getItem("solanaAddress");
    if (storedSolanaAddress && storedSolanaAddress !== solanaAddress) {
      setSolanaAddress(storedSolanaAddress);
    }
  }, [btcAddress, solanaAddress, setBtcAddress, setSolanaAddress]);

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
    if (!btcProvider) {
      toast({
        description: "Please install Phantom wallet extension first",
      });
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      const accounts = await btcProvider.requestAccounts();
      if (!accounts || accounts.length === 0) {
        toast({
          description: "Please create a Bitcoin wallet in Phantom first",
        });
        return;
      }

      const address = accounts[0].address;
      setBtcAddress(address);
      localStorage.setItem("btcAddress", address);
      return accounts;
    } catch (err) {
      toast({
        description: `Failed to connect BTC wallet: ${err}`,
      });
    }
  };

  const getBind = async (
    address: string,
    signature: string,
    btcAccount: BtcAccount[]
  ) => {
    const query = {
      address: address,
      sign: signature,
      items: btcAccount,
    };
    try {
      const data = await services.wtb.setBind(query);
      console.log("=====bind data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const connectSolana = async (btcAccount: BtcAccount[]) => {
    const solanaProvider = getSolanaProvider();
    if (!solanaProvider) {
      toast({
        description: "Please install Phantom wallet extension first",
      });
      window.open("https://phantom.app/", "_blank");
      return;
    }

    try {
      const resp = await solanaProvider.connect();
      if (!resp.publicKey) {
        toast({
          description: "Please create a Solana wallet in Phantom first",
        });
        return;
      }

      const address = resp.publicKey.toString();
      const jsonStr = JSON.stringify(btcAccount);
      const message = new TextEncoder().encode(jsonStr);
      const { signature } = await solanaProvider.signMessage(message, "utf8");

      const sigStr = Buffer.from(signature).toString("hex");
      await getBind(address, sigStr, btcAccount);

      localStorage.setItem("solanaAddress", address);
      setSolanaAddress(address);
      resetHolders();
    } catch (err) {
      toast({
        description: `Failed to connect Solana wallet: ${err}`,
      });
    }
  };

  const connectPhantom = async () => {
    try {
      const btcAccount = await connectBtc();
      await connectSolana(btcAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectBtc = async () => {
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
    resetHolders();
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
