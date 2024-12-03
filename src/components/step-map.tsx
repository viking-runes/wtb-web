// src/components/step-map.tsx
import React from "react";
import { Section, Text } from "@radix-ui/themes";
import config from "../config";
import { useTranslation } from "react-i18next";
import traderLogo from "/assets/img/trader.png";
import rectangle1 from "/assets/img/rectangle1.png";
import rectangle2 from "/assets/img/rectangle2.png";
import listLogo from "/assets/img/list.png";
import btcLogo from "/assets/img/btcLogo.png";
import rightLogo from "/assets/img/right.png";

import arrow1 from "/assets/img/arrow1.png";
import arrow2 from "/assets/img/arrow2.png";
import arrow3 from "/assets/img/arrow3.png";
import arrow4 from "/assets/img/arrow4.png";

const StepMap: React.FC = () => {
  return (
    <Section className="container max-w-screen-xl">
      <div className="hidden md:block">
        <DesktopMap />
      </div>
      <div className="block md:hidden">
        <MobileMap />
      </div>
    </Section>
  );
};

export default StepMap;

function DesktopMap() {
  const { t } = useTranslation();
  return (
    <div className="bg-[url('/assets/img/dashed.svg')] py-10 rounded-lg ">
      <div className="grid grid-cols-6 gap-4">
        <div className="flex justify-end items-center">
          <div className="flex flex-col gap-2">
            <img src={traderLogo} alt="trader" className="size-12" />
            <Text>Trader</Text>
          </div>
        </div>

        <div className="flex justify-center items-center pb-10">
          <img src={arrow1} alt="arrow" className="w-[100px]" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="relative  border  border-lightPurple rounded-xl w-[180px] h-[102px]">
            <img
              src={rectangle1}
              alt="trader"
              className="w-[180px] h-[100px] absolute top-0.5"
            />
            <Text className="text-xl absolute top-2 left-3 ">Wallet</Text>
            <Text className="text-xl  absolute bottom-2 right-3 ">PHANTOM</Text>
          </div>

          <Text className="text-sm text-nowrap">{t("step2")}</Text>
          <div className="flex items-center gap-1">
            <img src={rightLogo} alt="right" className="size-4" />
            <Text className="text-purple text-nowrap">
              Wallet:{" "}
              <a href={config.phantom} target="_blank">
                {config.phantom}
              </a>
            </Text>
          </div>
        </div>

        <div className="flex justify-center items-center pb-10">
          <img src={arrow2} alt="arrow" className="w-[100px]" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="relative border border-roseRed rounded-xl w-[180px] h-[102px]">
            <img
              src={rectangle2}
              alt="trader"
              className="w-[180px] h-[100px] absolute top-0.5"
            />
            <Text className="text-xl absolute top-2 left-3 ">$WTB</Text>
            <Text className="text-xl  absolute bottom-2 right-3 ">SOLANA</Text>
          </div>
          <Text className="text-sm text-nowrap">{t("step3")}</Text>
        </div>
        <div className="col-end-6 col-span-1 flex justify-center items-center mt-[-30px]">
          <img src={arrow3} alt="arrow" className="h-[80px]" />
        </div>

        <div className="flex flex-col gap-2 order-9 col-start-5 col-end-6 items-center">
          <div className="relative border-2 border-darkWhite rounded-lg w-[180px] h-[57px] flex items-center justify-center ">
            <Text className="text-sm">List of $WTB holders</Text>
            <img
              src={listLogo}
              alt="list"
              className="size-[22px] absolute top-[15px] left-[-15px] text-white"
            />
          </div>
          <Text className="text-sm translation-text text-center">
            {t("step4")}
          </Text>
        </div>

        <div className="flex justify-center items-center order-8 col-start-4 col-end-5 mb-24">
          <img src={arrow4} alt="arrow" className="w-[100px]" />
        </div>
        <div className="flex flex-col gap-2 order-7 col-start-3 col-end-4 items-center">
          <div className="relative border-2 border-darkYellow rounded-lg w-[180px] h-[57px] flex items-center justify-center ">
            <Text className="text-sm">Airdrop or WL</Text>
            <img
              src={btcLogo}
              alt="btc"
              className="size-[22px] absolute top-[15px] left-[-15px] text-white"
            />
          </div>
          <Text className="text-sm translation-text text-center">
            {t("step5")}
          </Text>
        </div>
        <div className="flex justify-center items-center col-start-1 col-end-3 px-12 mb-12 text-sm text-center">
          <Text>
            Please use the phantom link first, we will only get your bitcoin
            multichain address.
          </Text>
        </div>
      </div>
    </div>
  );
}

function MobileMap() {
  const { t } = useTranslation();
  return (
    <div className="bg-[url('/assets/img/dashed.svg')] py-10 rounded-lg px-4">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <img src={traderLogo} alt="trader" className="size-12" />
            <Text>Trader</Text>
          </div>
        </div>

        <div className="flex justify-center items-center rotate-90 h-[80px]">
          <img src={arrow1} alt="arrow" className="w-[80px]" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="relative  border  border-lightPurple rounded-xl w-[180px] h-[102px]">
            <img
              src={rectangle1}
              alt="trader"
              className="w-[180px] h-[100px] absolute top-0.5"
            />
            <Text className="text-xl absolute top-2 left-3 ">Wallet</Text>
            <Text className="text-xl  absolute bottom-2 right-3 ">PHANTOM</Text>
          </div>

          <Text className="text-sm text-nowrap">{t("step2")}</Text>
          <div className="flex items-center gap-1">
            <img src={rightLogo} alt="right" className="size-4" />
            <Text className="text-purple text-nowrap">
              Wallet:{" "}
              <a href={config.phantom} target="_blank">
                {config.phantom}
              </a>
            </Text>
          </div>
        </div>

        <div className="flex justify-center items-center rotate-90 h-[80px]">
          <img src={arrow2} alt="arrow" className="w-[80px]" />
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="relative border border-roseRed rounded-xl w-[180px] h-[102px]">
            <img
              src={rectangle2}
              alt="trader"
              className="w-[180px] h-[100px] absolute top-0.5"
            />
            <Text className="text-xl absolute top-2 left-3 ">$WTB</Text>
            <Text className="text-xl  absolute bottom-2 right-3 ">SOLANA</Text>
          </div>
          <Text className="text-sm text-nowrap">{t("step3")}</Text>
        </div>

        <div className="col-span-1 flex justify-center items-center ">
          <img src={arrow3} alt="arrow" className="h-[80px]" />
        </div>

        <div className="flex flex-col gap-2 items-center ">
          <div className="relative border-2 border-darkWhite rounded-lg w-[180px] h-[57px] flex items-center justify-center ">
            <Text className="text-sm">List of $WTB holders</Text>
            <img
              src={listLogo}
              alt="list"
              className="size-[22px] absolute top-[15px] left-[-15px] text-white"
            />
          </div>
          <Text className="text-sm translation-text text-center">
            {t("step4")}
          </Text>
        </div>
        <div className="flex justify-center items-center  -rotate-90 h-[80px]">
          <img src={arrow4} alt="arrow" className="w-[80px]" />
        </div>
        <div className="flex flex-col gap-2  items-center">
          <div className="relative border-2 border-darkYellow rounded-lg w-[180px] h-[57px] flex items-center justify-center ">
            <Text className="text-sm">Airdrop or WL</Text>
            <img
              src={btcLogo}
              alt="btc"
              className="size-[22px] absolute top-[15px] left-[-15px] text-white"
            />
          </div>
          <Text className="text-sm translation-text  text-center">
            {t("step5")}
          </Text>
        </div>
        <div className="flex justify-center items-center px-4 text-sm text-center">
          <Text>
            Please use the phantom link first, we will only get your bitcoin
            multichain address.
          </Text>
        </div>
      </div>
    </div>
  );
}
