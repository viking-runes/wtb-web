export interface IHoldersObject {
  page_no: number;
  page_size: number;
  total_page: number;
  t: number;
  holders: IHolders;
}

export interface IHolders {
  total: number;
  items: IHolderItem[];
}

export interface IHolderItem {
  index: number;
  is_top: boolean;
  sol_address: string;
  sol_balance: string;
  sol_decimals: number;
  btc_taproot_address: string;
  btc_nested_segwit_address: string;
}
