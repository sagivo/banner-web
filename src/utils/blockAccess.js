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

export async function getInfo() {
  const [message, price, publisher] = await readContract.getInfo();
  const num = ethers.utils.formatEther(price.toString());
  return [message, roundUp(num, 2), publisher];
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
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

export function subsrubeToNewMessage(cb) {
  readContract.on("NewMessage", (message, price, publisher) => {
    const num = ethers.utils.formatEther(price.toString());
    cb(message, roundUp(num, 2), publisher);
  });
}
