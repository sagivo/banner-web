import { ethers } from "ethers";
import abi from "./abi";

const provider = new ethers.providers.InfuraProvider(
  "rinkeby",
  "5ac032ada81f40b3808b1c90bacc95ba"
);
const readContract = new ethers.Contract(
  process.env.REACT_APP_CONTRACT_ADDRESS,
  abi,
  provider
);

export async function getMessage() {
  return await readContract.getMessage();
}

export async function getPrice() {
  const price = await readContract.getPrice();
  return ethers.utils.formatEther(price);
}
