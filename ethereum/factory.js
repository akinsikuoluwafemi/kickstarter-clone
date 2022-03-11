import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xEFf8eC21cc86C952b4d7B9AF6c47737eb31667E1"
);

export default instance;
