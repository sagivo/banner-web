import { ethers } from "ethers";
import abi from "./abi";

const getContract = (chain) => {
  console.log("chain", chain);
  const chains = {
    mainnet: {
      address: process.env.REACT_APP_CONTRACT_MAINNET_ADDRESS,
      infuraName: "mainnet",
    },
    rinkeby: {
      address: process.env.REACT_APP_CONTRACT_RINKEBY_ADDRESS,
      infuraName: "rinkeby",
    },
  };

  const provider = new ethers.providers.InfuraProvider(
    chains[chain].infuraName,
    process.env.REACT_APP_INFURA_ENDPOINT
  );
  return new ethers.Contract(chains[chain].address, abi, provider);
};

export async function getInfo(chain) {
  const readContract = getContract(chain);
  const [message, price, publisher] = await readContract.getInfo();
  const num = ethers.utils.formatEther(price.toString());
  return [message, roundUp(num, 2), publisher];
}

export function subsrubeToNewMessage(chain, cb) {
  const readContract = getContract(chain);
  readContract.on("NewMessage", (message, price, publisher) => {
    console.log("NewMessage", message, price, publisher);
    const num = ethers.utils.formatEther(price.toString());
    cb(message, roundUp(num, 2), publisher);
  });
}

export async function publishMessege(chain, signer, messege, value) {
  const readContract = getContract(chain);
  try {
    const response = await readContract
      .connect(signer)
      .setMessage(messege, { value });
    return response.hash;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}
