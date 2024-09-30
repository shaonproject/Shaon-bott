/**
* @Shaon Ahmed 
* @warn Do not edit code or edit credits
* @Dont Change This Credits Otherwisw Your Bot Lol
*/
module.exports.config = {
  name: "janu",
  version: "11.9.7",
  permssion: 0,
  credits: "Shaon Ahmed",
  prefix:false,
  description: "SIM",
  category: "Smi",
  usages: "janu",
  cooldowns: 30,
};

module.exports.run = async ({ api, event,args }) => {
const axios = require("axios");

const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json')
  const Shaon = apis.data.api
  
let query = args.join(" ");
if (!query)
    return api.sendMessage(`হুম জান বলো কি বলবা-!!❤️✌️`, event.threadID, event.messageID);
const res = await axios.get(`${Shaon}/sim?type=ask&ask=${query}`);
var plaintext = res.data.answer;
api.sendMessage(plaintext, event.threadID, event.messageID)
}
