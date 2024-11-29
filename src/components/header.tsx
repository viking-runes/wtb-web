import globalLogo from "/assets/img/global.png";
import xLogo from "/assets/img/xLogo.png";
import { useTranslation } from "react-i18next";
import { Popover, Button } from "@radix-ui/themes";
import config from "../config";
import TypeIt from "typeit-react";
import Wallet from "./wallet";

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 pt-6 md:max-xl:pb-28 pb-6 text-white xl:pb-12 xl:max-w-screen-xl xl:mx-auto">
      <div className="h-[60px] flex items-center gap-2">
        <TypeIt
          getBeforeInit={(instance) => {
            instance
              .type("<span class='text-4xl text-shadow text-yellow'>WTB</span>")
              .pause(750)
              .empty()
              .type(
                "<span class='text-4xl text-shadow'><span class='text-yellow'>W</span>elcome <span class='text-yellow'>T</span>o <span class='text-yellow'>B</span>itcoin</span>"
              );
            return instance;
          }}
          options={{
            speed: 100,
            waitUntilVisible: true,
            loop: true,
          }}
          as="div"
        />
      </div>

      <div className="absolute right-4">
        <div className="flex items-center justify-center md:gap-6 gap-2">
          <a href="" target="_blank" className="size-5">
            <img src={xLogo} alt="x" />
          </a>
          <Popover.Root>
            <Popover.Trigger>
              <img
                src={globalLogo}
                alt="language"
                className="size-6 cursor-pointer"
              />
            </Popover.Trigger>
            <Popover.Content size="1" maxWidth="300px">
              <div className="flex flex-col gap-1 ">
                {config.langMap.map((lng) => (
                  <Button
                    variant="solid"
                    key={lng.key}
                    onClick={() => changeLanguage(lng.key)}
                    className={`text-white bg-transparent ${
                      i18n.language === lng.key ? "text-yellow" : ""
                    } ring-0 outline-none cursor-pointer`}
                  >
                    {lng.display}
                  </Button>
                ))}
              </div>
            </Popover.Content>
          </Popover.Root>
          <div>
            <Wallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
