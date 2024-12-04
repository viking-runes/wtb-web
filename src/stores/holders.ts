import { atom, useAtom } from "jotai";
import { IHolderItem } from "../types/holder";
import services from "../service";

const currentHoldersAtom = atom<IHolderItem[]>([]);
const holderTotalAtom = atom<number>(0);
const pageAtom = atom<number>(1);
export const useHolders = () => {
  const [holderItems, setHolderItems] = useAtom(currentHoldersAtom);
  const [holderTotal, setHolderTotal] = useAtom(holderTotalAtom);
  const [page, setPage] = useAtom(pageAtom);

  const getHolders = async (page: number, address: string) => {
    const data = await services.wtb.getHolders(page, address);
    return data;
  };

  const resetHolders = () => {
    setHolderItems([]);
    setHolderTotal(0);
    setPage(1);
  };

  return {
    holderItems,
    holderTotal,
    page,
    setPage,
    resetHolders,
    setHolderItems,
    setHolderTotal,
    getHolders,
  };
};
