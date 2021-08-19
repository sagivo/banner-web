import { ethers } from "ethers";
import abi from "./abi";

const provider = new ethers.providers.InfuraProvider(
  "rinkeby",
  process.env.REACT_APP_INFURA_ENDPOINT
);
const readContract = new ethers.Contract(
  process.env.REACT_APP_CONTRACT_ADDRESS,
  abi,
  provider
);

export async function getMessage() {
  const message = await readContract.getMessage();
  console.log("message", message);
  return message;
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

export async function publishMessege(signer, messege, value) {
  try {
    const response = await readContract
      .connect(signer)
      .setMessage(messege, { value });
    console.log(response);
    return response.hash;
  } catch (error) {
    console.log(error);
    return null;
  }
}
