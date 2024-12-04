/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export async function getHolders(page: number, address: string) {
  try {
    const { data } = await axios.get(
      `${config.wtbApiUrl}/holders?page_no=${page}&page_size=10&sol_address=${address}`
    );
    return data;
  } catch (error: any) {
    console.error(`Error in getFee: ${error}`);
    throw error;
  }
}

export async function setBind(body: any) {
  try {
    const { data } = await axios.post(`${config.wtbApiUrl}/bind`, body);
    return data;
  } catch (error: any) {
    console.error(`Error in getFee: ${error}`);
    throw error;
  }
}
