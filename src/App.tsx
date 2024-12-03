import BtcVideo from "./components/btc-video";
import Header from "./components/header";
import { useTranslation } from "react-i18next";
import btcRight from "/assets/img/btcRight.png";
import { Section, Table, Text } from "@radix-ui/themes";
import StepMap from "./components/step-map";
import services from "./service";
import { useEffect, useState } from "react";
import { IHolderItem } from "./types/holder";
import { formatAddress, formatNumber, formatSolana } from "./utils";
import InfiniteScroll from "react-infinite-scroll-component";

const App: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<IHolderItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMoreItems = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const data = await services.wtb.getHolders(page);
      const newItems = data.data.holders.items;
      const total = data.data.holders.total;
      setItems((prev) => [...prev, ...newItems]);
      setTotal(total);
      setHasMore(total > items.length);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  return (
    <div className="font-pixel bg-custom-black text-white cursor-default">
      <div className="bg-cover bg-center object-cover h-min-[677px] w-full bg-[url('/assets/img/topBg.png')] ">
        <Header />
        {/* top */}
        <div className="container max-w-screen-xl">
          {/* <WalletConnector /> */}
          <div className="flex xl:flex-row max-md:flex-col-reverse gap-4 items-center text-3xl pt-17.5 max-md:justify-center xl:justify-between">
            <div className="size-32">
              <BtcVideo />
            </div>
            <div className="translation-text">
              {t("top1")}
              <br />
              {t("top2")}
            </div>
          </div>
          <div className="flex xl:flex-row  max-md:flex-col gap-4 items-center text-2xl pt-14 pb-5  max-md:justify-center xl:justify-between">
            <div>
              {t("top3")}
              <br />
              {t("top4")}
              <br />
              {t("top5")}
            </div>
            <img src={btcRight} alt="btc" className="h-32" />
          </div>
        </div>
      </div>
      {/* map */}
      <StepMap />
      {/* table */}
      <Section className="container max-w-screen-xl pt-0">
        <div className="flex items-center gap-5 text-3xl">
          <Text className="text-shadow text-yellow">$WTB Holders</Text>
          <Text className="text-shadow ">{formatNumber(total)}</Text>
        </div>

        <InfiniteScroll
          dataLength={items.length}
          next={loadMoreItems}
          hasMore={hasMore}
          loader={<h4 className="text-center py-2">Loading...</h4>}
          endMessage={<p className="text-center py-2">No more data</p>}
          scrollThreshold={0.9}
        >
          <Table.Root variant="ghost">
            <Table.Header>
              <Table.Row align="center">
                <Table.Cell justify="center">#</Table.Cell>
                <Table.Cell justify="center">Address on Solana</Table.Cell>
                <Table.Cell justify="center">$WTB Balance</Table.Cell>
                <Table.Cell justify="center">Address on BTC taproot</Table.Cell>
                <Table.Cell justify="center">
                  Address on BTC Nested SegWit
                </Table.Cell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((row) => (
                <Table.Row align="center" key={row.index}>
                  <Table.Cell justify="center" className="rt-common-cell">
                    <div className="p-6 bg-lightGrey">{row.index}</div>
                  </Table.Cell>
                  <Table.Cell justify="center" className="rt-common-cell">
                    <div className="p-6 bg-lightGrey text-nowrap">
                      {formatAddress(row.sol_address)}
                    </div>
                  </Table.Cell>
                  <Table.Cell justify="center" className="rt-common-cell">
                    <div className="p-6 bg-lightGrey">
                      {formatSolana(row.sol_balance, row.sol_decimals)}
                    </div>
                  </Table.Cell>
                  <Table.Cell justify="center" className="rt-common-cell">
                    <div className="p-6 bg-lightGrey text-nowrap">
                      {formatAddress(row.btc_taproot_address)}
                    </div>
                  </Table.Cell>
                  <Table.Cell justify="center" className="rt-common-cell">
                    <div className="p-6 bg-lightGrey text-nowrap">
                      {formatAddress(row.btc_nested_segwit_address)}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </InfiniteScroll>
      </Section>
    </div>
  );
};

export default App;
