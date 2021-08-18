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
  const num = ethers.utils.formatEther(price.toString());
  return roundUp(num, 2);
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

export async function getPublisher() {
  return await readContract.getPublisher();
}
