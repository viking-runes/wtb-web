/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import phantom from "/assets/img/phantom.svg";
import { formatAddress } from "../utils";
import { Popover, Button, Text } from "@radix-ui/themes";
import { BtcAccount, useWallet } from "../stores/wallet";
import userSvg from "/assets/img/user.svg";
import btcSvg from "/assets/img/btc.svg";
import solanaSvg from "/assets/img/solana.svg";
import step1 from "/assets/img/step1.png";
import step2 from "/assets/img/step2.png";
import step3 from "/assets/img/step3.png";
import { toast } from "../hooks/use-toast";
import services from "../service";
import { Buffer } from "buffer";
import { useHolders } from "../stores/holders";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const Wallet: React.FC = () => {
  const { btcAddress, setBtcAddress, solanaAddress, setSolanaAddress } =
    useWallet();
  const { resetHolders } = useHolders();
  const [open, setOpen] = React.useState(false);

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

      const p2trAccount = accounts.filter(
        (account: any) => account.addressType === "p2tr"
      );

      if (p2trAccount.length === 0) {
        setOpen(true);
        return;
      } else {
        const address = accounts[0].address;
        setBtcAddress(address);
        localStorage.setItem("btcAddress", address);
        return accounts;
      }
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
      if (btcAccount) {
        await connectSolana(btcAccount);
      }
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
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger className="h-0 absolute"></AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-full overflow-scroll -translate-x-1/2 -translate-y-1/2 rounded-md bg-lightGrey p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <AlertDialog.Title className="m-0 text-lg font-medium">
              Tips
            </AlertDialog.Title>
            <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal">
              The Bitcoin Native segwit address has been obtained successfully.
              Please follow the steps in the picture to connect again and upload
              the Bitcoin Taproot address.
            </AlertDialog.Description>
            <div className="flex xl:flex-row  max-md:flex-col items-center justify-center gap-4">
              <div className="flex flex-col gap-2 items-center">
                <img src={step1} alt="step1" className="w-40" />
                <Text className="text-sm">Step1-Setting</Text>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <img src={step2} alt="step2" className="w-40" />
                <Text className="text-sm">Step2-Preferences</Text>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <img src={step3} alt="step3" className="w-40" />
                <Text className="text-sm">Step3-Taproot</Text>
              </div>
            </div>
            <div className="flex justify-end gap-[25px] ring-0">
              <AlertDialog.Cancel asChild>
                <Button
                  variant="soft"
                  className={`ring-0 outline-none cursor-pointer font-pixel`}
                >
                  Know it
                </Button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default Wallet;
